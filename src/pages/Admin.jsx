import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Lock, Settings, Users, Database, ExternalLink,
    ShieldCheck, Activity, Camera, History,
    UserCheck, ChevronRight, Eye, RefreshCw, UploadCloud,
    Package, Search, ClipboardCheck, Box
} from 'lucide-react';
import { gsap } from 'gsap';

// VRE LOCALHOST SIMULATION DATA
const SAMPLE_DATA = {
    team: [
        { id: 's1', name: "Kishore S Shetty", subsystem: "Mechanical", years: "2023, 2024", role: "High Voltage Lead, Club Head", website_role: "Club Head", email: "kishore.shetty@vegaracing.com", image: "pilot.jpg" },
        { id: 's2', name: "Rakshit R Hegdal", subsystem: "Electrical", years: "2024, 2025", role: "Control Systems, Developer", website_role: "Web Dev", email: "rakshit.hegdal@vegaracing.com", image: "pilot.jpg" },
        { id: 's3', name: "Aditi Rao", subsystem: "Electronics", years: "2023, 2025", role: "Domain Head (Power)", website_role: "Domain Head", email: "aditi.rao@vegaracing.com", image: "pilot.jpg" },
        { id: 's4', name: "Rohan Gupta", subsystem: "Mechanical", years: "2024, 2026", role: "Chassis Design", website_role: "Team Member", email: "rohan.gupta@vegaracing.com", image: "pilot.jpg" },
        { id: 's5', name: "Sneha Patil", subsystem: "Data Science", years: "2025, 2027", role: "Telemetry Analyst", website_role: "Team Member", email: "sneha.patil@vegaracing.com", image: "pilot.jpg" }
    ],
    depot: [
        { id: 'd1', asset_id: "101000001", name: "Torque Wrench", count: "2", owner: "Vega", description: "Calibrated 10-100Nm", location: "Tool Room", category: "Mechanical Tools" },
        { id: 'd2', asset_id: "201000001", name: "Soldering Station", count: "5", owner: "Vega", description: "Digital temp control", location: "Lab", category: "Electrical Tools" },
        { id: 'd3', asset_id: "303000001", name: "Front Wing Flap", count: "1", owner: "Car", description: "Carbon fiber, spares", location: "Assembly Area", category: "Car Parts" },
        { id: 'd4', asset_id: "102000001", name: "M6 Bolts (Pack of 50)", count: "10", owner: "Vega", description: "Stainless steel grade 8.8", location: "Hardware Bin", category: "Mechanical Consumables" },
        { id: 'd5', asset_id: "202000001", name: "Heat Shrink Tubing", count: "20m", owner: "Vega", description: "Various sizes", location: "Wiring Area", category: "Electrical Consumables" }
    ],
    tasks: [
        { id: 't1', title: "Fix Landing Page Animation", status: "PENDING", priority: "High", member_email: "rakshit.hegdal@vegaracing.com", description: "Hero section skip bug" },
        { id: 't2', title: "Design Chassis Mounts", status: "DONE", priority: "Urgent", member_email: "kishore.shetty@vegaracing.com", description: "Update for v2 suspension" },
        { id: 't3', title: "Inventory Audit Q2", status: "PENDING", priority: "Medium", member_email: "aditi.rao@vegaracing.com", description: "Check tool room counts" },
        { id: 't4', title: "Test BMS firmware", status: "WARNING", priority: "High", member_email: "sneha.patil@vegaracing.com", description: "Cell balancing logic check" },
        { id: 't5', title: "Prepare Sponsorship Deck", status: "PENDING", priority: "Low", member_email: "rohan.gupta@vegaracing.com", description: "VRE Season 2026 Intro" }
    ]
};

const Admin = () => {
    // AUTH STATE
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // {email, role, id}

    // UI STATE
    const [activeTab, setActiveTab] = useState('TASKS');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isInitMode, setIsInitMode] = useState(false);

    // DATA STATE
    const [personnel, setPersonnel] = useState([]);
    const [bills, setBills] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadName, setUploadName] = useState('');
    const [uploadFile, setUploadFile] = useState(null);
    const [editMemberId, setEditMemberId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [newMemberData, setNewMemberData] = useState({});
    const [uploadMsg, setUploadMsg] = useState('');
    const [roster, setRoster] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [rosterMsg, setRosterMsg] = useState('');

    // INVENTORY / LOGISTICS STATE
    const [inventory, setInventory] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [inventorySearch, setInventorySearch] = useState('');
    const [isSubmittingAsset, setIsSubmittingAsset] = useState(false);
    const [newAssetData, setNewAssetData] = useState({ category: 'Mechanical Tools', owner: 'Vega' });
    const [inventoryMsg, setInventoryMsg] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [editInventoryId, setEditInventoryId] = useState(null);
    const [editInventoryData, setEditInventoryData] = useState({});
    const [inventoryCategory, setInventoryCategory] = useState('ALL');
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const [scanError, setScanError] = useState('');

    // --- CONFIG ---
    const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1OCigS6E0ZgoZtTdbgUTMUOqINIWz9dx59Owec54Ozyo/edit";
    const WEBSITE_ROLES = ["Web Dev", "Club Head", "Club Manager", "Domain Head", "Team Member", "Ex club member"];
    const INVENTORY_CATEGORIES = ["Mechanical Tools", "Mechanical Consumables", "Electrical Tools", "Electrical Consumables", "Accumulator", "Charging Cart", "Car Parts"];
    // -------------------

    useEffect(() => {
        window.scrollTo(0, 0);
        const storedUserJson = localStorage.getItem('vre_pilot_auth');
        if (storedUserJson) {
            const storedUser = JSON.parse(storedUserJson);
            // If it's an old session (no token), clear it for security
            if (!storedUser.token) {
                localStorage.removeItem('vre_pilot_auth');
                setIsAuthenticated(false);
            } else {
                setUser(storedUser);
                setIsAuthenticated(true);
            }
        }
    }, []);

    // BILLS FETCH
    // --- SYNC ENGINE (LIVE UPDATES) ---
    const fetchBills = async () => {
        try {
            const res = await fetch('/api/get_bills.php');
            const data = await res.json();
            setBills(data);
        } catch (e) { console.error("Bills fetch failed"); }
    };

    const fetchRoster = async () => {
        try {
            const res = await fetch('/api/manage_roster.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'LIST_ROSTER' })
            });
            const data = await res.json();
            
            if (window.location.hostname === 'localhost' && (!data || data.length === 0)) {
                setRoster(SAMPLE_DATA.team);
            } else {
                setRoster(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            if (window.location.hostname === 'localhost') setRoster(SAMPLE_DATA.team);
            else setRoster([]);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/manage_tasks.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_TASKS' }) });
            const data = await res.json();
            if (window.location.hostname === 'localhost' && (!data || data.length === 0)) {
                setTasks(SAMPLE_DATA.tasks);
            } else {
                setTasks(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            if (window.location.hostname === 'localhost') setTasks(SAMPLE_DATA.tasks);
            else setTasks([]);
        }
    };

    const fetchInventory = async () => {
        try {
            const res = await fetch('/api/manage_inventory.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_INVENTORY' }) });
            const data = await res.json();
            if (window.location.hostname === 'localhost' && (!data || data.length === 0)) {
                setInventory(SAMPLE_DATA.depot);
            } else {
                setInventory(Array.isArray(data) ? data : []);
            }
        } catch (e) {
            if (window.location.hostname === 'localhost') setInventory(SAMPLE_DATA.depot);
            else setInventory([]);
        }
    };

    const fetchSubmissions = async () => {
        try {
            const res = await fetch('/api/manage_inventory.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_SUBMISSIONS' }) });
            const data = await res.json();
            setSubmissions(Array.isArray(data) ? data : []);
        } catch (e) { setSubmissions([]); }
    };

    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/get_logs.php');
            const data = await res.json();
            setLogs(Array.isArray(data) ? data : []);
        } catch (e) { console.error("Logs fetch failed"); }
    };

    // POLLING ENGINE
    useEffect(() => {
        if (!isAuthenticated) return;
        
        // Initial Fetch
        fetchTasks();
        fetchInventory();
        fetchSubmissions();
        fetchRoster();
        if (canViewFinance) {
            fetchBills();
            fetchLogs();
        }

        const syncInterval = setInterval(() => {
            if (activeTab === 'TASKS') fetchTasks();
            if (activeTab === 'DEPOT') { fetchInventory(); fetchSubmissions(); }
            if (activeTab === 'TEAM') fetchRoster();
            if (activeTab === 'FINANCE' && canViewFinance) fetchBills();
            if (activeTab === 'DEPOT_MANAGER' && canViewFinance) fetchLogs();
        }, 5000); // 5s Polling for "Live" feel

        return () => clearInterval(syncInterval);
    }, [isAuthenticated, activeTab]);

    useEffect(() => {
        if (activeTab === 'DEPOT_MANAGER') fetchLogs();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'FINANCE') fetchBills();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'TEAM') fetchRoster();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'TASKS') fetchTasks();
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'DEPOT') {
            fetchInventory();
            if (canManageTeam) fetchSubmissions();
        }
    }, [activeTab, user]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setLoginError('');
        try {
            const res = await fetch('/api/login.php', {
                method: 'POST',
                body: JSON.stringify({ email, password, action: isInitMode ? 'INIT' : null })
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const text = await res.text();
                console.error("Server returned non-JSON response:", text);
                throw new Error("SERVER ERROR: Non-JSON Response (Check PHP/DB)");
            }

            const data = await res.json();
            if (data.status === 'success') {
                const sessionUser = {
                    email: data.user.email,
                    role: data.user.role,
                    token: data.token
                };
                setUser(sessionUser);
                setIsAuthenticated(true);
                localStorage.setItem('vre_pilot_auth', JSON.stringify(sessionUser));
            } else {
                setLoginError("ACCESS DENIED: " + (data.message || "INVALID AUTH"));
                gsap.fromTo(".login-box", { x: -10 }, { x: 0, duration: 0.1, repeat: 5, yoyo: true });
            }
        } catch (error) {
            console.error("Login catch error:", error);
            setLoginError(error.message.includes("SERVER ERROR") ? error.message : "LINK OFFLINE: CHECK API/DB CONFIG");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('vre_pilot_auth');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadFile || !uploadName) return;
        setIsUploading(true);
        setUploadMsg('');

        const formData = new FormData();
        formData.append('image', uploadFile);
        formData.append('member_name', uploadName);
        formData.append('user_email', user.email);

        try {
            const res = await fetch('/api/upload_image.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.status === 'success') {
                setUploadMsg("UPLOAD SUCCESS: " + data.url);
                setUploadName('');
                setUploadFile(null);
            } else {
                setUploadMsg("ERROR: " + data.message);
            }
        } catch (e) { setUploadMsg("UPLOAD FAILED"); }
        finally { setIsUploading(false); }
    };

    const handleBulkImport = async (e) => {
        e.preventDefault();
        if (!csvFile) return;
        setRosterMsg("PROCESSING IMPORT...");
        const formData = new FormData();
        formData.append('csv_file', csvFile);
        formData.append('action', 'IMPORT_CSV');

        try {
            const res = await fetch('/api/manage_roster.php', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.status === 'success') {
                setRosterMsg(data.message);
                setCsvFile(null);
                const res2 = await fetch('/api/manage_roster.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_ROSTER' }) });
                const data2 = await res2.json();
                setRoster(data2);
            } else {
                let errStr = data.message || "IMPORT FAILED";
                if (data.errors) errStr += ": " + data.errors.slice(0, 3).join(", ");
                setRosterMsg(errStr);
            }
        } catch (e) { setRosterMsg("IMPORT FAILED"); }
    };

    const handleRosterWipe = async () => {
        if (!window.confirm("CRITICAL: THIS WILL PURGE EVERY PILOT FROM THE DATABASE. PROCEED?")) return;
        try {
            const res = await fetch('/api/manage_roster.php', { method: 'POST', body: JSON.stringify({ action: 'WIPE_ROSTER' }) });
            if ((await res.json()).status === 'success') {
                setRoster([]);
                setRosterMsg("DATABASE PURGED.");
                setTimeout(() => setRosterMsg(''), 3000);
            }
        } catch (e) { setRosterMsg("WIPE FAILED"); }
    };

    const handleAddMemberSave = async () => {
        try {
            const res = await fetch('/api/manage_roster.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'ADD_MEMBER', ...newMemberData })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setIsAddingMember(false);
                setNewMemberData({});
                const res2 = await fetch('/api/manage_roster.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_ROSTER' }) });
                const data2 = await res2.json();
                setRoster(Array.isArray(data2) ? data2 : []);
            } else alert("ADD FAILED: " + data.message);
        } catch (e) { alert("ADD FAILED"); }
    };

    const handleSaveMemberInfo = async () => {
        try {
            const res = await fetch('/api/manage_roster.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'UPDATE_MEMBER', ...editFormData })
            });
            const data = await res.json();
            if (data.status === 'success') {
                setEditMemberId(null);
                const res2 = await fetch('/api/manage_roster.php', { method: 'POST', body: JSON.stringify({ action: 'LIST_ROSTER' }) });
                const data2 = await res2.json();
                setRoster(Array.isArray(data2) ? data2 : []);
            } else alert("UPDATE FAILED: " + data.message);
        } catch (e) { alert("UPDATE FAILED"); }
    };

    const deleteMember = async (id) => {
        if (!window.confirm("DELETE MEMBER?")) return;
        const previousRoster = [...roster];
        setRoster(prev => prev.filter(m => m.id !== id));
        try {
            const res = await fetch('/api/manage_roster.php', { method: 'POST', body: JSON.stringify({ action: 'DELETE_MEMBER', id }) });
            if ((await res.json()).status !== 'success') {
                setRoster(previousRoster);
                alert("DELETE FAILED");
            }
        } catch (e) { 
            setRoster(previousRoster);
            alert("DELETE FAILED"); 
        }
    };

    const handleTaskCreate = async (e, memberId, title, desc) => {
        e.preventDefault();
        const res = await fetch('/api/manage_tasks.php', {
            method: 'POST',
            body: JSON.stringify({ action: 'CREATE_TASK', member_id: memberId, admin_id: user.id || 1, title, description: desc })
        });
        const data = await res.json();
        if (data.status === 'success') {
            setActiveTab('TASKS'); // Refresh
        }
    };

    const handleTaskStatus = async (taskId, newStatus) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
        try {
            await fetch('/api/manage_tasks.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'UPDATE_STATUS', task_id: taskId, status: newStatus })
            });
        } catch (e) {
            fetchTasks(); // Revert on error
        }
    };

    // PERMISSIONS HELPERS (Case-Insensitive) - Now strictly uses Website Roles
    const normalizedRole = user?.role?.toUpperCase() || "";
    const canManageTeam = ['WEB DEV', 'CLUB HEAD', 'CLUB MANAGER', 'DOMAIN HEAD'].includes(normalizedRole);
    const canViewFinance = ['WEB DEV', 'CLUB HEAD', 'CLUB MANAGER'].includes(normalizedRole); // Strictly high-level
    const canAssignTasks = ['WEB DEV', 'CLUB HEAD', 'CLUB MANAGER', 'DOMAIN HEAD'].includes(normalizedRole);

    const tasksArray = Array.isArray(tasks) ? tasks : [];
    const visibleTasks = canAssignTasks ? tasksArray : tasksArray.filter(t => t.member_email === user?.email);

    // Filtered Inventory (with safety check to prevent crash on non-array return)
    const inventoryArray = Array.isArray(inventory) ? inventory : [];
    const filteredInventory = inventoryArray.filter(item => {
        const matchesSearch = (item.name || '').toLowerCase().includes(inventorySearch.toLowerCase()) ||
            (item.asset_id || '').toLowerCase().includes(inventorySearch.toLowerCase()) ||
            (item.category || '').toLowerCase().includes(inventorySearch.toLowerCase());
        const matchesCategory = inventoryCategory === 'ALL' || item.category === inventoryCategory;
        return matchesSearch && matchesCategory;
    });

    // INVENTORY HANDLERS
    const handleAssetSubmission = async () => {
        if (!newAssetData.name) return;
        const res = await fetch('/api/manage_inventory.php', {
            method: 'POST',
            body: JSON.stringify({ action: 'SUBMIT_ITEM', ...newAssetData, submitted_by: user.email })
        });
        const data = await res.json();
        if (data.status === 'success') {
            setIsSubmittingAsset(false);
            setInventoryMsg("ASSET REQUEST LOGGED. AWAITING CLEARANCE.");
            setTimeout(() => setInventoryMsg(''), 3000);
        }
    };

    const handleApproveAsset = async (id) => {
        // Optimistic Update
        const target = submissions.find(s => s.id === id);
        if (!target) return;
        
        setSubmissions(prev => prev.filter(s => s.id !== id));
        setInventory(prev => [...prev, { ...target, asset_id: "PENDING..." }]);

        try {
            const res = await fetch('/api/manage_inventory.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'APPROVE_SUBMISSION', submission_id: id, admin_email: user.email })
            });
            const data = await res.json();
            if (data.status === 'success') {
                fetchInventory();
                fetchSubmissions();
            } else {
                alert("APPROVAL FAILED: " + (data.message || "Unknown Error"));
                fetchSubmissions(); // Revert
                fetchInventory();
            }
        } catch (e) { 
            console.error("Approve failed", e);
            fetchSubmissions();
            fetchInventory();
        }
    };

    const handleRejectAsset = async (id) => {
        setSubmissions(prev => prev.filter(s => s.id !== id));
        try {
            const res = await fetch('/api/manage_inventory.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'REJECT_SUBMISSION', submission_id: id, admin_email: user.email })
            });
            if ((await res.json()).status !== 'success') {
                fetchSubmissions();
            }
        } catch (e) { fetchSubmissions(); }
    };

    const handleDeleteAsset = async (id) => {
        if (!window.confirm("PURGE ASSET FROM REGISTRY?")) return;
        setInventory(prev => prev.filter(i => i.id !== id));
        try {
            const res = await fetch('/api/manage_inventory.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'DELETE_ITEM', id, admin_email: user.email })
            });
            if ((await res.json()).status !== 'success') fetchInventory();
        } catch (e) { fetchInventory(); }
    };

    const handleSaveInventoryInfo = async () => {
        try {
            const res = await fetch('/api/manage_inventory.php', {
                method: 'POST',
                body: JSON.stringify({ action: 'UPDATE_ITEM', ...editInventoryData })
            });
            if ((await res.json()).status === 'success') {
                setEditInventoryId(null);
                fetchInventory();
            }
        } catch (e) { console.error("Update failed"); }
    };

    // LOGIN RENDER
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
                <div className="login-box max-w-sm w-full bg-[#0a0a0a] border border-primary/20 p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40"></div>
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/10 animate-pulse">
                            <Lock size={20} className="text-primary" />
                        </div>
                        <h1 className="font-orbitron font-black text-2xl text-white uppercase tracking-widest mb-2 italic">Pilot Registry</h1>
                        <p className="font-mono text-[10px] text-muted tracking-widest uppercase">Encryption: DATABASE-LINKED</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">Pilot Email</label>
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-surface border border-white/10 px-4 py-3 font-mono text-[11px] text-white focus:border-primary focus:outline-none tracking-widest uppercase"
                                placeholder="PILOT@VRE.PES.EDU" required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">Secure Passkey</label>
                            <input
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-surface border border-white/10 px-4 py-3 font-mono text-[11px] text-white focus:border-primary focus:outline-none tracking-[0.5em] text-center"
                                placeholder="••••••" required
                            />
                        </div>
                        {loginError && <p className="font-mono text-[9px] text-primary text-center uppercase animate-pulse italic">{loginError}</p>}
                        <button type="submit" disabled={isLoggingIn}
                            className="w-full bg-primary py-4 font-orbitron font-black text-[11px] text-white tracking-[0.4em] uppercase italic transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                        >
                            {isLoggingIn ? "DECRYPTING..." : (isInitMode ? "REGISTER PASSKEY" : "AUTHENTICATE")}
                        </button>
                        <button type="button" onClick={() => setIsInitMode(!isInitMode)}
                            className="w-full mt-2 text-[9px] font-mono tracking-widest uppercase text-muted hover:text-white transition-colors p-2 underline decoration-white/20 underline-offset-4"
                        >
                            {isInitMode ? "ALREADY REGISTERED? LOGIN HERE" : "FIRST TIME LOGIN? SET PASSWORD"}
                        </button>
                    </form>
                    {window.location.hostname === 'localhost' && (
                        <button
                            onClick={() => { setUser({ email: 'DEV@LOCALHOST', role: 'WEB DEV' }); setIsAuthenticated(true); }}
                            className="w-full mt-4 border border-primary/40 py-3 font-mono text-[9px] text-primary hover:bg-primary/5 uppercase tracking-widest italic"
                        >
                            Bypass Login [DEV MODE]
                        </button>
                    )}
                    <Link to="/" className="block mt-8 text-center font-mono text-[9px] text-muted hover:text-white transition-colors tracking-widest uppercase italic">Abort Mission</Link>
                </div>
            </div>
        );
    }

    // SCANNER HANDLER
    const startScanner = () => {
        setIsScannerOpen(true);
        setTimeout(() => {
            const html5QrCode = new window.Html5Qrcode("scanner-region");
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            
            // ASSET ID REGEX: 9 digits starting with defined prefixes
            const assetPattern = /^(101|102|201|202|301|302|303)\d{6}$/;

            html5QrCode.start({ facingMode: "environment" }, config, (decodedText) => {
                if (assetPattern.test(decodedText)) {
                    setInventorySearch(decodedText);
                    setIsScannerOpen(false);
                    setScanError('');
                    html5QrCode.stop();
                } else {
                    setScanError(`INVALID ASSET ID: ${decodedText}`);
                    setTimeout(() => setScanError(''), 3000);
                    console.warn("Invalid Asset ID Scanned:", decodedText);
                }
            }).catch(err => console.error("Scanner failed", err));
        }, 500);
    };

    // MAIN DASHBOARD RENDER
    return (
        <div className="min-h-screen bg-background flex">
            {/* --- SIDEBAR --- */}
            <div className="w-20 md:w-64 border-r border-white/5 bg-[#050505] flex flex-col pt-10 pb-8 sticky top-0 h-screen">
                <div className="px-6 mb-12 hidden md:block">
                    <span className="font-orbitron font-black text-2xl text-white italic tracking-tighter">VRE <span className="text-primary italic">OS</span></span>
                    <p className="font-mono text-[8px] text-primary tracking-[0.4em] uppercase font-bold mt-1">Command Core</p>
                </div>

                <nav className="flex-grow flex flex-col gap-2 px-3 md:px-6">
                    <NavItem icon={<Settings size={18} />} label="Tasks" active={activeTab === 'TASKS'} onClick={() => setActiveTab('TASKS')} />
                    <NavItem icon={<Package size={18} />} label="Depot" active={activeTab === 'DEPOT'} onClick={() => setActiveTab('DEPOT')} />
                    {canViewFinance && <NavItem icon={<ClipboardCheck size={18} />} label="Audit Log" active={activeTab === 'DEPOT_MANAGER'} onClick={() => setActiveTab('DEPOT_MANAGER')} />}
                    {canViewFinance && <NavItem icon={<Database size={18} />} label="Finance" active={activeTab === 'FINANCE'} onClick={() => setActiveTab('FINANCE')} />}
                    {canManageTeam && <NavItem icon={<Camera size={18} />} label="Assets" active={activeTab === 'ASSETS'} onClick={() => setActiveTab('ASSETS')} />}
                    {canManageTeam && <NavItem icon={<UserCheck size={18} />} label="Team Hub" active={activeTab === 'TEAM'} onClick={() => setActiveTab('TEAM')} />}
                </nav>

                <div className="px-6 pt-6 border-t border-white/5">
                    <div className="mb-4 hidden md:block">
                        <p className="font-mono text-[8px] text-muted uppercase mb-1">Authenticated As:</p>
                        <p className="font-mono text-[9px] text-white uppercase truncate">{user?.email || 'OFFLINE'}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary/10 border border-primary/20 text-primary font-mono text-[7px] font-bold uppercase tracking-widest">
                            {user?.role || 'UNKNOWN'}
                        </span>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left font-mono text-[10px] text-primary hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                        <Lock size={12} /> <span className="hidden md:inline">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-grow p-6 md:p-12 lg:p-16 overflow-y-auto">
                {/* --- MISSION CONTROL --- */}
                {activeTab === 'TASKS' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                        <Header title="Mission Control" subtitle="Operational Task Tracking & Assignment" />

                        {canAssignTasks && (
                            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm mb-8">
                                <h4 className="font-orbitron font-black text-xs text-primary uppercase italic tracking-widest mb-6">Assign New Mission</h4>
                                <form onSubmit={(e) => {
                                    const assigneeId = e.target.assignee.value;
                                    const tTitle = e.target.title.value;
                                    const tDesc = e.target.desc.value;
                                    handleTaskCreate(e, assigneeId, tTitle, tDesc);
                                    e.target.reset();
                                }} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                                    <div className="space-y-2">
                                        <label className="font-mono text-[9px] text-muted uppercase">Target Pilot</label>
                                        <select name="assignee" required className="w-full bg-background border border-white/10 px-4 py-2.5 font-mono text-[10px] text-white">
                                            {roster.map(r => <option key={r.id} value={r.id} className="bg-background">{r.name} - {r.subsystem}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-mono text-[9px] text-muted uppercase">Mission Title</label>
                                        <input name="title" required className="w-full bg-background border border-white/10 px-4 py-2.5 font-mono text-[10px] text-white" placeholder="E.g. Calibrate VCU" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2 flex gap-4">
                                        <div className="flex-grow space-y-2">
                                            <label className="font-mono text-[9px] text-muted uppercase">Directive Details</label>
                                            <input name="desc" className="w-full bg-background border border-white/10 px-4 py-2.5 font-mono text-[10px] text-white" placeholder="Optional details..." />
                                        </div>
                                        <button type="submit" className="bg-primary px-8 py-2.5 font-orbitron font-black text-[10px] text-white tracking-widest uppercase italic hover:scale-105 active:scale-95 transition-all h-[36px] self-end">
                                            DEPLOY
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-primary/5 border-b border-primary/20 uppercase text-[10px] tracking-widest text-primary">
                                    <tr>
                                        <th className="p-6">Assignee</th>
                                        <th className="p-6">Mission</th>
                                        <th className="p-6">Status</th>
                                        <th className="p-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-[11px] uppercase tracking-wider text-white">
                                    {visibleTasks.length > 0 ? visibleTasks.map((t) => (
                                        <tr key={t.id} className="hover:bg-white/2 transition-colors">
                                            <td className="p-6 font-bold">{t.member_name}</td>
                                            <td className="p-6">
                                                <div className="font-bold text-white mb-1">{t.title}</div>
                                                <div className="text-[9px] text-muted normal-case italic">{t.description}</div>
                                            </td>
                                            <td className="p-6">
                                                <span className={`px-2 py-1 rounded-xs text-[8px] font-bold ${t.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                                                    {t.status}
                                                </span>
                                            </td>
                                            <td className="p-6 text-center">
                                                {t.status === 'PENDING' && (
                                                    <button onClick={() => handleTaskStatus(t.id, 'COMPLETED')} className="border border-white/10 px-4 py-2 hover:bg-white/5 transition-all text-[9px] font-bold">MARK DONE</button>
                                                )}
                                                {t.status === 'COMPLETED' && canAssignTasks && (
                                                    <div className="flex gap-2 justify-center">
                                                        <button onClick={() => handleTaskStatus(t.id, 'APPROVED')} className="p-2 border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/5 transition-all text-[9px]">APPROVE</button>
                                                        <button onClick={() => handleTaskStatus(t.id, 'PENDING')} className="p-2 border border-primary/40 text-primary hover:bg-primary/5 transition-all text-[9px]">REJECT</button>
                                                    </div>
                                                )}
                                                {t.status === 'APPROVED' && <span className="text-[9px] opacity-20">CLEARED</span>}
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="4" className="p-20 text-center opacity-30 italic">NO ACTIVE MISSIONS</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- FINANCE TAB --- */}
                {activeTab === 'FINANCE' && canViewFinance && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Header title="Finance Registry" subtitle="Live tracking for expenditures and bills" />
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden mb-10">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-primary/5 border-b border-primary/20 uppercase text-[10px] tracking-widest text-primary">
                                    <tr>
                                        <th className="p-6">Date</th>
                                        <th className="p-6">Description</th>
                                        <th className="p-6 text-right">Amount (₹)</th>
                                        <th className="p-6 text-center">Receipt</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-[11px] uppercase tracking-wider text-white">
                                    {bills.length > 0 ? bills.map((bill, i) => (
                                        <tr key={i} className="hover:bg-white/2 transition-colors">
                                            <td className="p-6 opacity-60">{bill.date}</td>
                                            <td className="p-6 font-bold">{bill.description}</td>
                                            <td className="p-6 text-right font-bold text-primary">{bill.amount}</td>
                                            <td className="p-6 text-center">
                                                {bill.receipt ? <a href={bill.receipt} target="_blank" rel="noreferrer" className="text-primary hover:underline">VIEW DOC</a> : "-"}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="4" className="p-20 text-center font-mono text-[9px] text-muted tracking-widest uppercase">
                                                Waiting for cloud data synchronization...
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-primary/5 p-6 border border-primary/20 inline-block">
                            <a href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer" className="font-orbitron font-black text-[10px] text-white tracking-widest uppercase flex items-center gap-2 italic">
                                Update Sheets Archive <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                )}

                {/* --- ASSETS TAB --- */}
                {activeTab === 'ASSETS' && canManageTeam && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Header title="Assets" subtitle="Direct upload to team_assets repository" />
                        <div className="max-w-2xl bg-[#0a0a0a] border border-white/5 p-12 rounded-sm text-center">
                            <form onSubmit={handleUpload} className="space-y-10">
                                <div className="space-y-4">
                                    <label className="font-mono text-[10px] text-primary font-bold uppercase tracking-[0.3em] block text-left">Step 1: Identify Member</label>
                                    <input
                                        type="text" value={uploadName} onChange={(e) => setUploadName(e.target.value)}
                                        className="w-full bg-surface border border-white/10 px-6 py-4 font-mono text-[11px] text-white focus:border-primary focus:outline-none tracking-widest uppercase placeholder:text-white/10"
                                        placeholder="ENTER NAME (E.G. ADITI SHARMA)" required
                                    />
                                    <p className="font-mono text-[8px] text-muted tracking-widest uppercase text-left italic">* The system will auto-rename the file to: {uploadName ? uploadName.toLowerCase().replace(/ /g, '_') : 'name'}.png/jpg</p>
                                </div>

                                <div className="space-y-4">
                                    <label className="font-mono text-[10px] text-primary font-bold uppercase tracking-[0.3em] block text-left">Step 2: Select Visual</label>
                                    <label className="w-full h-48 border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-all rounded-sm group relative overflow-hidden">
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => setUploadFile(e.target.files[0])} />
                                        {uploadFile ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <UserCheck size={30} className="text-emerald-500 mb-2" />
                                                <span className="font-mono text-xs text-white uppercase tracking-widest">{uploadFile.name}</span>
                                                <span className="font-mono text-[8px] text-muted uppercase">Ready for renaming </span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3">
                                                <UploadCloud size={32} className="text-muted group-hover:text-primary transition-colors duration-500" />
                                                <span className="font-mono text-[10px] text-muted uppercase tracking-widest group-hover:text-white">Drag & drop or Click to Select</span>
                                            </div>
                                        )}
                                    </label>
                                </div>

                                {uploadMsg && <p className="font-mono text-[9px] text-primary bg-primary/5 p-4 border border-primary/20 tracking-wider uppercase italic">{uploadMsg}</p>}

                                <button type="submit" disabled={isUploading || !uploadFile}
                                    className="w-full bg-primary py-5 font-orbitron font-black text-xs text-white tracking-[0.5em] uppercase italic transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-xl"
                                >
                                    {isUploading ? "SYNCHRONIZING..." : "EXECUTE UPLOAD & RENAME"}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* --- TEAM HUB TAB --- */}
                {activeTab === 'TEAM' && canManageTeam && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                        <Header title="Team Hub" subtitle="Master synchronization with MySQL Database" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* BULK IMPORTER */}
                            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <Database size={16} className="text-primary" />
                                    <h4 className="font-orbitron font-black text-xs text-white uppercase italic tracking-widest">Bulk CSV Importer</h4>
                                </div>
                                <form onSubmit={handleBulkImport} className="space-y-6">
                                    <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} className="w-full bg-white/5 border border-white/10 px-4 py-3 font-mono text-[10px] text-white" />
                                    <div className="flex gap-4">
                                        <button type="submit" disabled={!csvFile} className="flex-grow bg-primary py-3 font-orbitron font-black text-[10px] text-white tracking-widest italic uppercase transition-all hover:scale-105 disabled:opacity-30">
                                            IMPORT NOW
                                        </button>
                                        <button type="button" onClick={handleRosterWipe} className="border border-primary/40 px-6 py-3 font-orbitron font-black text-[10px] text-primary tracking-widest uppercase italic hover:bg-primary/5 transition-all">
                                            WIPE DATA
                                        </button>
                                    </div>
                                    {rosterMsg && <p className="font-mono text-[9px] text-primary bg-primary/5 p-3 border border-primary/20 italic tracking-wider">{rosterMsg}</p>}
                                </form>
                                <div className="mt-8 pt-8 border-t border-white/5">
                                    <p className="font-mono text-[9px] text-muted tracking-widest uppercase leading-loose">
                                        Columns required: Name, Subsystem, Years, Role, LinkedIn, GitHub, Instagram, Image_Path
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-sm">
                                <h4 className="font-orbitron font-black text-xs text-white uppercase italic tracking-widest mb-6">Cloud Backup</h4>
                                <p className="font-mono text-[11px] text-muted tracking-widest uppercase mb-10 leading-loose">
                                    You can still edit in your Google Sheet, download as CSV, and import here for the fastest website load.
                                </p>
                                <a href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 border border-white/10 px-8 py-4 font-orbitron font-black text-[10px] text-white hover:border-white transition-all tracking-widest italic">
                                    Open Spreadsheet <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* ROSTER TABLE */}
                        <div className="flex justify-end mb-6">
                            <button onClick={() => { setIsAddingMember(true); setNewMemberData({}); }} className="bg-primary/10 text-primary border border-primary/20 px-6 py-3 font-orbitron font-black text-[10px] tracking-widest uppercase italic hover:bg-primary/20 transition-all shadow-[0_0_20px_rgba(230,57,70,0.1)]">
                                + ADD NEW PILOT
                            </button>
                        </div>
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-white/5 border-b border-white/10 uppercase text-[10px] tracking-widest text-primary">
                                    <tr>
                                        <th className="p-6">Member Name</th>
                                        <th className="p-6">Subsystem</th>
                                        <th className="p-6">Admin Access</th>
                                        <th className="p-6">Public Role</th>
                                        <th className="p-6 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-[11px] uppercase tracking-wider text-white">
                                    {isAddingMember && (
                                        <tr className="bg-primary/5 hover:bg-primary/10 transition-colors">
                                            <td className="p-4 font-bold border-l-2 border-primary">
                                                <input className="bg-transparent border-b border-primary outline-none w-full mb-1 placeholder:text-primary/40 text-primary" placeholder="Name" value={newMemberData.name || ''} onChange={e => setNewMemberData({ ...newMemberData, name: e.target.value })} />
                                                <div className="mt-2 space-y-1">
                                                    <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-white/50 block placeholder:text-white/30" placeholder="LinkedIn URL" value={newMemberData.linkedin || ''} onChange={e => setNewMemberData({ ...newMemberData, linkedin: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-white/50 block placeholder:text-white/30" placeholder="GitHub URL" value={newMemberData.github || ''} onChange={e => setNewMemberData({ ...newMemberData, github: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-white/50 block placeholder:text-white/30" placeholder="Instagram URL" value={newMemberData.instagram || ''} onChange={e => setNewMemberData({ ...newMemberData, instagram: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-white/50 block placeholder:text-white/30" placeholder="Image File (e.g. pilot.jpg)" value={newMemberData.image || ''} onChange={e => setNewMemberData({ ...newMemberData, image: e.target.value })} />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="space-y-1">
                                                    <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-white/30 text-white" placeholder="Domain (e.g. Electrical)" value={newMemberData.subsystem || ''} onChange={e => setNewMemberData({ ...newMemberData, subsystem: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-white/30 mt-2 text-white" placeholder="Account Email (Login)" value={newMemberData.email || ''} onChange={e => setNewMemberData({ ...newMemberData, email: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-white/30 text-white" placeholder="Account Password" value={newMemberData.password || ''} onChange={e => setNewMemberData({ ...newMemberData, password: e.target.value })} />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <select 
                                                    className="bg-transparent border-b border-white/50 outline-none w-full text-white appearance-none cursor-pointer"
                                                    value={newMemberData.website_role || 'Team Member'} 
                                                    onChange={e => setNewMemberData({ ...newMemberData, website_role: e.target.value })}
                                                >
                                                    {WEBSITE_ROLES.map(r => <option key={r} value={r} className="bg-background text-white">{r.toUpperCase()}</option>)}
                                                </select>
                                            </td>
                                            <td className="p-4 text-[9px]">
                                                <div className="space-y-1">
                                                    <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-white/30 text-white" placeholder="Years (e.g. 2024, 2025)" value={newMemberData.years || ''} onChange={e => setNewMemberData({ ...newMemberData, years: e.target.value })} />
                                                    <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-white/30 text-white" placeholder="Descriptive Role (Public)" value={newMemberData.role || ''} onChange={e => setNewMemberData({ ...newMemberData, role: e.target.value })} />
                                                </div>
                                            </td>
                                            <td className="p-4 text-center items-center justify-center gap-2 flex flex-wrap">
                                                <button onClick={handleAddMemberSave} className="text-emerald-500 font-bold hover:scale-110 border border-emerald-500/20 px-3 py-1">CREATE</button>
                                                <button onClick={() => { setIsAddingMember(false); setNewMemberData({}); }} className="text-muted hover:scale-110 ml-2">CANCEL</button>
                                            </td>
                                        </tr>
                                    )}
                                    {roster.length > 0 ? roster.map((mem) => {
                                        const isEditing = editMemberId === mem.id;
                                        return (
                                            <tr key={mem.id} className="hover:bg-white/2 transition-colors">
                                                <td className="p-4 font-bold">
                                                    {isEditing ? <input className="bg-transparent border-b border-primary outline-none w-full" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} /> : mem.name}
                                                    {isEditing && (
                                                        <div className="mt-2 space-y-1">
                                                            <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-muted block" placeholder="LinkedIn" value={editFormData.linkedin || ''} onChange={e => setEditFormData({ ...editFormData, linkedin: e.target.value })} />
                                                            <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-muted block" placeholder="GitHub" value={editFormData.github || ''} onChange={e => setEditFormData({ ...editFormData, github: e.target.value })} />
                                                            <input className="bg-transparent border-b border-white/20 outline-none w-full text-[8px] text-muted block" placeholder="Instagram" value={editFormData.instagram || ''} onChange={e => setEditFormData({ ...editFormData, instagram: e.target.value })} />
                                                            <input className="bg-transparent border-b border-emerald-500/50 outline-none w-full text-[8px] text-emerald-400 block placeholder:text-emerald-500/50" placeholder="Image File (e.g. aditi.jpg)" value={editFormData.image || ''} onChange={e => setEditFormData({ ...editFormData, image: e.target.value })} />
                                                        </div>
                                                    )}
                                                    {!isEditing && mem.email && <div className="text-[8px] text-primary lowercase tracking-widest font-sans mt-1">{mem.email}</div>}
                                                    {!isEditing && mem.image && <div className="text-[8px] text-emerald-500/70 uppercase tracking-widest font-mono mt-1">IMG: {mem.image}</div>}
                                                </td>
                                                <td className="p-4 text-[9px]">
                                                    {isEditing ? (
                                                        <div className="space-y-1">
                                                            <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-muted" placeholder="Domain (e.g. Electrical)" value={editFormData.subsystem || ''} onChange={e => setEditFormData({ ...editFormData, subsystem: e.target.value })} />
                                                            <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-muted mt-2" placeholder="Account Email (Login)" value={editFormData.email || ''} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} />
                                                            <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-muted" placeholder="Account Password" value={editFormData.password || ''} onChange={e => setEditFormData({ ...editFormData, password: e.target.value })} />
                                                        </div>
                                                    ) : mem.subsystem}
                                                </td>
                                                <td className="p-4">
                                                    {isEditing ? (
                                                        <select 
                                                            className="bg-transparent border-b border-primary outline-none w-full text-white appearance-none cursor-pointer"
                                                            value={editFormData.website_role || 'Team Member'} 
                                                            onChange={e => setEditFormData({ ...editFormData, website_role: e.target.value })}
                                                        >
                                                            {WEBSITE_ROLES.map(r => <option key={r} value={r} className="bg-background text-white">{r.toUpperCase()}</option>)}
                                                        </select>
                                                    ) : (
                                                        <span className={`px-2 py-0.5 rounded-xs text-[8px] font-bold ${mem.website_role === 'Web Dev' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/50'}`}>
                                                            {mem.website_role || "TEAM MEMBER"}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-[9px]">
                                                    {isEditing ? (
                                                        <div className="space-y-1">
                                                            <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-muted" placeholder="Years (e.g. 2024, 2025)" value={editFormData.years || ''} onChange={e => setEditFormData({ ...editFormData, years: e.target.value })} />
                                                            <input className="bg-transparent border-b border-white/50 outline-none w-full placeholder:text-muted" placeholder="Descriptive Role (Public)" value={editFormData.role || ''} onChange={e => setEditFormData({ ...editFormData, role: e.target.value })} />
                                                        </div>
                                                    ) : mem.role}
                                                </td>
                                                <td className="p-4 text-center items-center justify-center gap-2 flex flex-wrap">
                                                    {isEditing ? (
                                                        <>
                                                            <button onClick={handleSaveMemberInfo} className="text-emerald-500 font-bold hover:scale-110">SAVE</button>
                                                            <button onClick={() => setEditMemberId(null)} className="text-muted hover:scale-110 ml-2">CANCEL</button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button onClick={() => { setEditMemberId(mem.id); setEditFormData({ ...mem }); }} className="text-white hover:text-primary transition-colors text-[9px]">EDIT</button>
                                                            <button onClick={() => deleteMember(mem.id)} className="text-primary hover:scale-110 transition-transform ml-2">X</button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    }) : (
                                        <tr><td colSpan="4" className="p-10 text-center opacity-30">NO DATA IN LOCAL ROSTER</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'DEPOT' && (
                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Header title="VRE DEPOT" subtitle="CENTRAL LOGISTICS & ASSET CONTROL" />

                        {/* TOP SECTION: APPROVALS (ADMIN ONLY) */}
                        {canManageTeam && submissions.length > 0 && (
                            <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <ClipboardCheck className="text-primary" size={20} />
                                    <h3 className="font-orbitron font-black text-xs tracking-[0.3em] uppercase italic text-primary">CUSTOMS CLEARANCE (PENDING APPROVAL)</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {submissions.map(sub => (
                                        <div key={sub.id} className="bg-black/40 border border-white/10 p-4 rounded-xs flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-black text-white/90 uppercase">{sub.name}</span>
                                                    <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded-full text-muted uppercase">{sub.category}</span>
                                                </div>
                                                <p className="text-[9px] text-muted mb-4 italic line-clamp-2">{sub.description || 'No description provided'}</p>
                                                <div className="flex gap-4 text-[8px] uppercase tracking-widest text-white/40 mb-4">
                                                    <span>QTY: {sub.count || 1}</span>
                                                    <span>LOC: {sub.location || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pt-2 border-t border-white/5">
                                                <button onClick={() => handleApproveAsset(sub.id)} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-[8px] py-2 transition-all">APPROVE</button>
                                                <button onClick={() => handleRejectAsset(sub.id)} className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[8px] py-2 transition-all">REJECT</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ACTION BAR: SEARCH & LOG MUNITIONS */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="relative w-full md:w-96 flex gap-2">
                                <div className="relative flex-grow">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={14} />
                                    <input 
                                        className="w-full bg-white/5 border border-white/10 px-12 py-3 font-mono text-[11px] text-white focus:border-primary outline-none uppercase tracking-widest"
                                        placeholder="SEARCH ASSET ID / NAME..."
                                        value={inventorySearch}
                                        onChange={e => setInventorySearch(e.target.value)}
                                    />
                                </div>
                                <button 
                                    onClick={startScanner}
                                    className="bg-primary/20 border border-primary/40 p-3 text-primary hover:bg-primary/30 transition-all flex items-center justify-center"
                                    title="Open QR Scanner"
                                >
                                    <Camera size={18} />
                                </button>
                            </div>
                            <button 
                                onClick={() => setIsSubmittingAsset(true)}
                                className="w-full md:w-auto bg-primary px-8 py-3 font-orbitron font-black text-[10px] tracking-widest uppercase italic hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <Box size={14} />
                                LOG MUNITIONS
                            </button>
                        </div>

                        {/* SCANNER MODAL */}
                        {isScannerOpen && (
                            <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-6 backdrop-blur-xl">
                                <div className="max-w-md w-full border border-primary/30 bg-[#0a0a0a] p-8 rounded-sm">
                                    <h3 className="font-orbitron font-black text-xl italic text-white tracking-widest uppercase text-center mb-6">SCANNING MUNITION</h3>
                                    <div id="scanner-region" className="w-full aspect-square bg-white/5 border border-white/10 overflow-hidden mb-4"></div>
                                    
                                    {scanError && (
                                        <div className="bg-primary/10 border border-primary/20 p-3 mb-4 animate-bounce">
                                            <p className="font-mono text-[9px] text-primary text-center uppercase tracking-widest font-bold">{scanError}</p>
                                        </div>
                                    )}

                                    <button 
                                        onClick={() => setIsScannerOpen(false)}
                                        className="w-full border border-primary/40 py-4 font-orbitron font-black text-[10px] text-primary tracking-widest uppercase italic hover:bg-primary/10 transition-all"
                                    >
                                        ABORT SCAN
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* CATEGORY FILTER */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            <button 
                                onClick={() => setInventoryCategory('ALL')}
                                className={`px-4 py-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-all border ${inventoryCategory === 'ALL' ? 'bg-primary border-primary text-white' : 'border-white/10 text-muted hover:border-white/30'}`}
                            >
                                ALL UNITS
                            </button>
                            {INVENTORY_CATEGORIES.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setInventoryCategory(cat)}
                                    className={`px-4 py-2 font-mono text-[9px] tracking-[0.2em] uppercase transition-all border ${inventoryCategory === cat ? 'bg-primary border-primary text-white' : 'border-white/10 text-muted hover:border-white/30'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* LOG MUNITIONS OVERLAY */}
                        {isSubmittingAsset && (
                            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
                                <div className="bg-[#0a0a0a] border border-primary/30 max-w-lg w-full p-10 relative">
                                    <div className="text-center mb-8">
                                        <h3 className="font-orbitron font-black text-xl italic text-white tracking-widest uppercase mb-2">DEPLOY ASSET</h3>
                                        <p className="font-mono text-[9px] text-muted tracking-widest uppercase">SUBMIT TO CUSTOMS FOR VERIFICATION</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold text-primary uppercase">Category</label>
                                                <select 
                                                    className="w-full bg-white/5 border border-white/10 px-4 py-2 text-[11px] text-white outline-none focus:border-primary appearance-none cursor-pointer font-mono uppercase"
                                                    value={newAssetData.category}
                                                    onChange={e => setNewAssetData({...newAssetData, category: e.target.value})}
                                                >
                                                    <option value="Mechanical Tools">Mechanical Tools</option>
                                                    <option value="Mechanical Consumables">Mechanical Consumables</option>
                                                    <option value="Electrical Tools">Electrical Tools</option>
                                                    <option value="Electrical Consumables">Electrical Consumables</option>
                                                    <option value="Accumulator">Accumulator</option>
                                                    <option value="Charging Cart">Charging Cart</option>
                                                    <option value="Car Parts">Car Parts</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold text-primary uppercase">Item Name</label>
                                                <input className="w-full bg-white/5 border border-white/10 px-4 py-2 text-[11px] text-white outline-none focus:border-primary font-mono uppercase" value={newAssetData.name || ''} onChange={e => setNewAssetData({...newAssetData, name: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold text-primary uppercase">Count / Qty</label>
                                                <input className="w-full bg-white/5 border border-white/10 px-4 py-2 text-[11px] text-white outline-none focus:border-primary font-mono" value={newAssetData.count || ''} onChange={e => setNewAssetData({...newAssetData, count: e.target.value})} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-bold text-primary uppercase">Location</label>
                                                <input className="w-full bg-white/5 border border-white/10 px-4 py-2 text-[11px] text-white outline-none focus:border-primary font-mono uppercase" value={newAssetData.location || ''} onChange={e => setNewAssetData({...newAssetData, location: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[8px] font-bold text-primary uppercase">Description / Notes</label>
                                            <textarea className="w-full bg-white/5 border border-white/10 px-4 py-2 text-[11px] text-white outline-none focus:border-primary font-mono uppercase h-24 resize-none" value={newAssetData.description || ''} onChange={e => setNewAssetData({...newAssetData, description: e.target.value})} />
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button onClick={handleAssetSubmission} className="flex-1 bg-primary py-3 font-orbitron font-black text-[10px] tracking-[0.2em] italic uppercase hover:scale-[1.02] active:scale-95 transition-all">SUBMIT REQUEST</button>
                                            <button onClick={() => setIsSubmittingAsset(false)} className="flex-1 border border-white/10 text-muted font-bold text-[10px] py-3 hover:text-white transition-all uppercase">CANCEL</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ASSET REGISTRY TABLE */}
                        <div className="flex justify-between items-end mb-4">
                            <p className="font-mono text-[9px] text-muted tracking-widest uppercase">
                                Scan Results: <span className="text-primary font-black">{filteredInventory.length}</span> Assets Identified
                            </p>
                            {inventoryCategory !== 'ALL' && (
                                <button onClick={() => setInventoryCategory('ALL')} className="text-[8px] text-primary hover:underline font-mono uppercase tracking-widest italic">
                                    Clear Category Filter
                                </button>
                            )}
                        </div>
                        <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-white/5 border-b border-white/10 uppercase text-[9px] tracking-widest text-primary font-black">
                                    <tr>
                                        <th className="p-6">Asset ID</th>
                                        <th className="p-6">Description</th>
                                        <th className="p-6">Specs</th>
                                        <th className="p-6">Location</th>
                                        {canManageTeam && <th className="p-6 text-center">Action</th>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-[10px] uppercase tracking-wider text-white">
                                    {filteredInventory.length > 0 ? filteredInventory.map(item => {
                                        const isEditing = editInventoryId === item.id;
                                        return (
                                            <tr key={item.id} className="hover:bg-white/2 transition-colors group">
                                                <td className="p-6 font-black text-primary group-hover:animate-pulse">{item.asset_id}</td>
                                                <td className="p-6">
                                                    {isEditing ? (
                                                        <div className="space-y-2">
                                                            <input className="w-full bg-white/10 border-b border-primary text-[11px] outline-none px-2 py-1" value={editInventoryData.name || ''} onChange={e => setEditInventoryData({...editInventoryData, name: e.target.value})} />
                                                            <textarea className="w-full bg-white/10 border-b border-white/20 text-[8px] text-muted outline-none px-2 py-1 h-12 resize-none" value={editInventoryData.description || ''} onChange={e => setEditInventoryData({...editInventoryData, description: e.target.value})} />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="text-[11px] font-bold mb-1">{item.name}</div>
                                                            <div className="text-[8px] text-muted line-clamp-1 italic">{item.description}</div>
                                                        </>
                                                    )}
                                                </td>
                                                <td className="p-6">
                                                    {isEditing ? (
                                                        <div className="space-y-2">
                                                            <input className="w-full bg-white/10 border-b border-white/20 text-[9px] outline-none px-2 py-1" placeholder="QTY" value={editInventoryData.count || ''} onChange={e => setEditInventoryData({...editInventoryData, count: e.target.value})} />
                                                            <select className="w-full bg-background border-b border-white/20 text-[7px] outline-none px-2 py-1" value={editInventoryData.category || ''} onChange={e => setEditInventoryData({...editInventoryData, category: e.target.value})}>
                                                                {INVENTORY_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                                            </select>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col gap-1 opacity-70">
                                                            <span>QTY: {item.count || 1}</span>
                                                            <span>CAT: {item.category}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-6">
                                                    {isEditing ? (
                                                        <input className="w-full bg-white/10 border-b border-white/20 text-[9px] outline-none px-2 py-1" placeholder="LOCATION" value={editInventoryData.location || ''} onChange={e => setEditInventoryData({...editInventoryData, location: e.target.value})} />
                                                    ) : (
                                                        <span className="text-white/50">{item.location || 'N/A'}</span>
                                                    )}
                                                </td>
                                                {canViewFinance && (
                                                    <td className="p-6 text-center">
                                                        {isEditing ? (
                                                            <div className="flex gap-3 justify-center">
                                                                <button onClick={handleSaveInventoryInfo} className="text-emerald-500 font-bold hover:scale-110">SAVE</button>
                                                                <button onClick={() => setEditInventoryId(null)} className="text-muted hover:scale-110">X</button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex gap-4 justify-center items-center">
                                                                <button onClick={() => { setEditInventoryId(item.id); setEditInventoryData({...item}); }} className="text-white/40 hover:text-white transition-colors text-[9px]">EDIT</button>
                                                                <button onClick={() => handleDeleteAsset(item.id)} className="text-primary/40 hover:text-primary transition-colors">X</button>
                                                            </div>
                                                        )}
                                                    </td>
                                                )}
                                            </tr>
                                        );
                                    }) : (
                                        <tr><td colSpan={canManageTeam ? 5 : 4} className="p-20 text-center opacity-20 font-orbitron italic tracking-widest">DEPOT SCANNING... NO ASSETS LOCATED</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- DEPOT MANAGER (AUDIT LOG) --- */}
                {activeTab === 'DEPOT_MANAGER' && canViewFinance && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                        <Header title="Depot Audit" subtitle="Full cryptographic log of inventory modifications" />
                        
                        <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
                            <table className="w-full text-left font-mono">
                                <thead className="bg-primary/5 border-b border-primary/20 uppercase text-[10px] tracking-widest text-primary">
                                    <tr>
                                        <th className="p-6">Timestamp</th>
                                        <th className="p-6">Operator</th>
                                        <th className="p-6">Action Executed</th>
                                        <th className="p-6 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-[11px] uppercase tracking-wider text-white">
                                    {logs.length > 0 ? logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/2 transition-colors">
                                            <td className="p-6 opacity-60 font-mono text-[10px]">{new Date(log.timestamp).toLocaleString().toUpperCase()}</td>
                                            <td className="p-6 font-bold text-primary">{log.user_email}</td>
                                            <td className="p-6 italic">{log.action}</td>
                                            <td className="p-6 text-center">
                                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[8px] font-black">VERIFIED</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="4" className="p-20 text-center opacity-30 italic">NO AUDIT LOGS RETRIEVED</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// HELPER COMPONENTS
const NavItem = ({ icon, label, active, onClick, isCollapsed }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 px-4 py-4 rounded-sm transition-all group ${active ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white hover:bg-white/5'}`}
    >
        <span className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-300`}>{icon}</span>
        {!isCollapsed && <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.2em] italic hidden md:inline">{label}</span>}
    </button>
);

const Header = ({ title, subtitle }) => (
    <div className="mb-16 relative">
        <div className="absolute -top-8 right-0 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="font-mono text-[7px] text-emerald-500/50 uppercase tracking-[0.3em] font-bold">LINK ACTIVE: SYNCING LIVE</span>
        </div>
        <h2 className="font-orbitron font-black text-5xl text-white uppercase italic tracking-tighter mb-2">{title}</h2>
        <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary"></div>
            <p className="font-mono text-[10px] text-muted tracking-[0.3em] uppercase">{subtitle}</p>
        </div>
    </div>
);

const HealthRow = ({ label, status }) => (
    <div className="flex justify-between items-center py-2 border-b border-white/5">
        <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest">{label}</span>
        <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-xs">{status}</span>
    </div>
);

export default Admin;
