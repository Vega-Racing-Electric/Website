import fs from 'fs';
import path from 'path';

const csvFilePath = path.resolve('vre_team.csv');
const jsFilePath = path.resolve('src/data/team.js');

// Role hierarchy: lower number = higher rank
const roleHierarchyScore = (role) => {
    const r = (role || '').toLowerCase();
    if (r.includes('founder') || r.includes('captain')) return 0;
    if (r.includes('head')) return 1;
    if (r.includes('manager')) return 2;
    if (r.includes('lead')) return 3;
    return 4; // Technical Team Member, Team Member, etc.
};

// Simple robust CSV parser handling quoted cells containing commas/newlines
const parseCSV = (str) => {
    const result = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];

        if (char === '"' && str[i + 1] === '"') {
            currentCell += '"';
            i++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if (char === '\n' && !inQuotes) {
            currentRow.push(currentCell.trim());
            if (currentRow.some(c => c)) result.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else if (char === '\r') {
            // ignore
        } else {
            currentCell += char;
        }
    }

    if (currentCell || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        if (currentRow.some(c => c)) result.push(currentRow);
    }

    return result;
};

try {
    const csvData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = parseCSV(csvData);

    if (rows.length < 2) throw new Error("CSV file format is invalid or empty.");

    const teamData = [];

    // CSV Headers: Name, Domain, Years Active, Role, Description, LinkedIn, GitHub, Instagram, Image
    // Roles are in the SAME ORDER as years — one role per year
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length < 2) continue;

        const _name = row[0] || "";
        if (!_name) continue;

        const _subsystem = row[1] || "";
        const _years = (row[2] || "").split(',').map(y => y.trim()).filter(y => y);
        const _rolesRaw = (row[3] || "").split(',').map(r => r.trim()).filter(r => r);
        const _description = (row[4] || "").replace(/"/g, '\\"');
        const _linkedin = row[5] || "";
        const _github = row[6] || "";
        const _instagram = row[7] || "";
        const _image = row[8] || "/images/Team/placeholder.png";

        // Build rolesByYear: map each year to its corresponding role.
        // If fewer roles than years exist, repeat the last role.
        const rolesByYear = {};
        _years.forEach((year, idx) => {
            rolesByYear[year] = _rolesRaw[idx] || _rolesRaw[_rolesRaw.length - 1] || "Team Member";
        });

        // Determine the "highest ranking" role across all years for the All Batches view
        const highestRole = _rolesRaw.reduce((best, r) => {
            return roleHierarchyScore(r) < roleHierarchyScore(best) ? r : best;
        }, _rolesRaw[0] || "Team Member");

        teamData.push({
            name: _name,
            role: highestRole,
            rolesByYear,
            subsystem: _subsystem,
            years: _years,
            image: _image,
            description: _description,
            linkedin: _linkedin,
            github: _github,
            instagram: _instagram
        });
    }

    // Build JS content
    let jsContent = 'export const team = [\n';

    teamData.forEach((member, index) => {
        const yearsStr = member.years.map(y => `"${y}"`).join(', ');

        // Build rolesByYear inline object
        const rbyEntries = Object.entries(member.rolesByYear)
            .map(([yr, rl]) => `"${yr}": "${rl.replace(/"/g, '\\"')}"`)
            .join(', ');

        jsContent += `    {\n`;
        jsContent += `        name: "${member.name}",\n`;
        jsContent += `        role: "${member.role.replace(/"/g, '\\"')}",\n`;
        jsContent += `        rolesByYear: { ${rbyEntries} },\n`;
        jsContent += `        subsystem: "${member.subsystem}",\n`;
        jsContent += `        years: [${yearsStr}],\n`;
        jsContent += `        image: "${member.image}",\n`;
        jsContent += `        description: "${member.description}",\n`;
        jsContent += `        linkedin: "${member.linkedin}",\n`;
        jsContent += `        github: "${member.github}",\n`;
        jsContent += `        instagram: "${member.instagram}"\n`;
        jsContent += index === teamData.length - 1 ? `    }\n` : `    },\n`;
    });

    jsContent += '];\n';

    fs.writeFileSync(jsFilePath, jsContent, 'utf-8');
    console.log(`✅ Successfully synced ${teamData.length} team members from vre_team.csv to src/data/team.js!`);
    console.log(`   → Each member now has per-year roles + highest overall role for 'All Batches' view.`);

} catch (err) {
    console.error("Error updating team data:", err);
}
