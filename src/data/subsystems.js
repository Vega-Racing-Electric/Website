// TODO: Replace with real subsystem details
export const subsystems = [
    {
        id: "powertrain",
        name: "Powertrain",
        description: "High-efficiency motor integration and power delivery systems.",
        fullDescription: "The powertrain subsystem focuses on converting electrical energy from the accumulator into mechanical torque at the wheels. We utilize a high-performance Emrax 208 motor paired with a custom drivetrain.",
        icon: "zap",
        specs: ["Single-stage planetary reduction", "Custom aluminum housing", "High-torque delivery"],
        members: [
            { name: "John Doe", role: "Subsystem Lead" },
            { name: "Jane Smith", role: "Drivetrain Lead" },
        ]
    },
    {
        id: "bms",
        name: "Battery & BMS",
        description: "Advanced cell monitoring and safety systems.",
        fullDescription: "Our custom Battery Management System (BMS) ensures safe operation by monitoring voltage, current, and temperature of every cell in the accumulator. It's the heart of our safety strategy.",
        icon: "battery",
        specs: ["Custom 400V stack", "Active cell balancing", "Distributed temperature sensing"],
        members: [
            { name: "Alice Wong", role: "BMS Architect" },
            { name: "Bob Chen", role: "Hardware Engineer" },
        ]
    },
    {
        id: "suspension",
        name: "Suspension & Chassis",
        description: "Lightweight structures and optimized kinematics.",
        fullDescription: "The chassis is a chrome-moly spaceframe designed for maximum torsional stiffness at minimum weight. The suspension geometry is optimized for high-speed cornering.",
        icon: "settings",
        specs: ["4130 Chrome-moly frame", "Ohlins TTX25 dampers", "Custom CFRP bodyworks"],
        members: [
            { name: "Charlie Brown", role: "Chassis Lead" },
        ]
    },
    {
        id: "aero",
        name: "Aerodynamics",
        description: "CFD-optimized downforce packages.",
        fullDescription: "Our aerodynamics package creates high downforce for improved grip in tight turns. Using Star-CCM+, we've optimized every wing profile for Formula Student speeds.",
        icon: "wind",
        specs: ["Multi-element front wing", "Swan-neck rear wing", "Diffuser integration"],
        members: []
    },
    {
        id: "electronics",
        name: "Electronics & Controls",
        description: "CAN-bus communication and vehicle control units.",
        fullDescription: "The vehicle's nervous system. We use a central VCU to process sensor data and implement advanced control strategies like Traction Control.",
        icon: "cpu",
        specs: ["STM32-based VCU", "CAN-FD communication", "Real-time telemetry"],
        members: []
    },
    {
        id: "dynamics",
        name: "Vehicle Dynamics",
        description: "Simulations and performance tuning.",
        fullDescription: "The brain behind the physical performance. Vehicle dynamics uses lap-time simulations and tire modeling to find the winning setup for every track.",
        icon: "activity",
        specs: ["Tire modeling (MF 5.2)", "G-G diagrams", "Lap-time simulation"],
        members: []
    },
];
