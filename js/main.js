// ===== Replicated Magnify effect (Letters for Titles, Words for Paragraphs) =====

// 1. Titles / Headers (Split by Letters)
const bigHeaders = document.querySelectorAll("h1, h2, h4, .magnify_text");
bigHeaders.forEach((el) => {
    if (el.dataset.magnified === "true" || el.children.length > 0) return;
    const text = el.innerText;
    el.innerHTML = text.split("").map(char => {
        if (char === " ") return "<span>&nbsp;</span>";
        return `<span class="effect">${char}</span>`;
    }).join("");
    el.dataset.magnified = "true";
});

// 2. Body Text (Smart splitting: preserves links/icons)
const textElements = document.querySelectorAll("p, li, .info, .tag, #about p");
textElements.forEach((el) => {
    if (el.dataset.magnified === "true") return;

    function splitTextNodes(node) {
        if (node.nodeType === 3) { // Text Node
            const words = node.nodeValue.split(/(\s+)/);
            const fragment = document.createDocumentFragment();
            words.forEach(word => {
                if (word.trim().length > 0) {
                    const span = document.createElement('span');
                    span.className = 'effect2';
                    span.innerText = word;
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(word));
                }
            });
            node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === 1 && node.childNodes) {
            if (["I", "SVG", "CANVAS", "BUTTON", "SCRIPT"].includes(node.tagName)) return;
            Array.from(node.childNodes).forEach(splitTextNodes);
        }
    }

    splitTextNodes(el);
    el.dataset.magnified = "true";
});

// ===== Custom cursor =====
const cursorNode = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
    if (cursorNode) {
        cursorNode.style.left = e.clientX + "px";
        cursorNode.style.top = e.clientY + "px";
    }
});

// ===== Scroll to top button =====
var scrollTopBtn = document.querySelector(".scrollTop");
window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
        if(scrollTopBtn) scrollTopBtn.style.opacity = '1';
    } else {
        if(scrollTopBtn) scrollTopBtn.style.opacity = '0';
    }
});

window.scrollToTop = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ===== Typewriter =====
var app = document.getElementById('typeabletext');
if (app) {
    var typewriter = new Typewriter(app, {
        loop: true,
        delay: 75,
    });
    typewriter
        .pauseFor(500)
        .typeString('IT Infrastructure & Security Engineer')
        .pauseFor(4000)
        .deleteAll()
        .typeString('Network Administrator')
        .pauseFor(1000)
        .deleteAll()
        .typeString('System Administrator')
        .pauseFor(1000)
        .deleteAll()
        .typeString('Medical IT')
        .pauseFor(1000)
        .start();
}

// ===== AOS =====
AOS.init();

// ===== Contact form with Terminal Feedback =====
window.sendMail = function(ev) {
    ev.preventDefault();
    const btn = ev.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-terminal"></i> [ENCRYPTING...]';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> [SUCCESS: REDIRECTING]';
        btn.classList.add('btn-success');
        
        setTimeout(() => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            window.open(`mailto:mohamedelsayid@outlook.com?subject=${subject}&body=${'I am ' + name + ' (' + email + '). ' + message}`);
            
            // Reset
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.style.opacity = '1';
        }, 1000);
    }, 1500);
};

// ===== Theme toggle & Auto Detection =====
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');
var curr_mode = 'dark'; // Site starts in dark mode

window.changeTheme = function() {
    const moon = document.getElementById('moon');
    const sun = document.getElementById('sun');
    const body = document.body;

    if (curr_mode === 'light') {
        // Switch to Dark Mode
        if(moon) moon.style.display = 'none';
        if(sun) sun.style.display = 'block';
        curr_mode = 'dark';
    } else {
        // Switch to Light Mode
        if(sun) sun.style.display = 'none';
        if(moon) moon.style.display = 'block';
        curr_mode = 'light';
    }
    body.classList.toggle("light-mode");
};

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    window.changeTheme(); 
}

// ===== BIOS Boot Effect =====
const bootOverlay = document.getElementById('bootOverlay');
const bootContainer = document.getElementById('bootContainer');
const bootLines = [
    "MSL_OS v2.0.4 RC1 starting...",
    "[ OK ] CPU initialization completed.",
    "[ OK ] RAM self-test passed (65536 MB).",
    "[ OK ] Network stack online: 10Gbps Link detected.",
    "[ WAIT ] Checking Home Lab resources...",
    "[ OK ] Laboratory clusters reaching quorum.",
    "[ OK ] Initializing Secure Gateway...",
    "[ OK ] Certificates verified (CSCO15040282).",
    "Starting Portfolio Interface...",
    "LOGIN: guest@portfolio - No password required.",
    "SYSTEM READY."
];

let lineIdx = 0;
window.printBootLine = function() {
    if (lineIdx < bootLines.length) {
        const line = document.createElement('div');
        line.className = 'boot-line';
        let content = bootLines[lineIdx];
        if (content.includes('[ OK ]')) {
            content = content.replace('[ OK ]', '<span class="boot-ok">[ OK ]</span>');
        }
        line.innerHTML = content;
        if(bootContainer) bootContainer.appendChild(line);
        if(bootContainer) bootContainer.scrollTop = bootContainer.scrollHeight;
        lineIdx++;
        setTimeout(window.printBootLine, 150 + Math.random() * 200);
    } else {
        setTimeout(() => {
            window.skipBootSequence();
        }, 800);
    }
};

window.skipBootSequence = function() {
    if (bootOverlay && bootOverlay.style.display !== "none") {
        gsap.to(bootOverlay, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                bootOverlay.style.display = "none";
                window.animateNameWave();
            }
        });
    }
};

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") window.skipBootSequence();
});

if (bootContainer) window.printBootLine();

// ===== Realistic Dashboard Simulation =====
let curCPU = 32.4, curMEM = 58.1, curNET = 1.2;
function updateDash() {
    curCPU += (Math.random() - 0.5) * 4;
    curMEM += (Math.random() - 0.5) * 1.5;
    curNET += (Math.random() - 0.5) * 0.4;
    if (curCPU < 5) curCPU = 20; if (curCPU > 85) curCPU = 60;
    if (curMEM < 40) curMEM = 50; if (curMEM > 95) curMEM = 80;
    if (curNET < 0.2) curNET = 0.8; if (curNET > 4.5) curNET = 2.0;

    const cf = document.querySelector('.cpu-fill');
    const cv = document.querySelector('.cpu-val');
    const mf = document.querySelector('.mem-fill');
    const mv = document.querySelector('.mem-val');
    const nf = document.querySelector('.net-fill');
    const nv = document.querySelector('.net-val');

    if (cf) cf.style.width = curCPU + '%';
    if (cv) cv.innerText = curCPU.toFixed(1) + '%';
    if (mf) mf.style.width = curMEM + '%';
    if (mv) mv.innerText = curMEM.toFixed(1) + '%';
    if (nf) nf.style.width = (curNET * 20) + '%';
    if (nv) nv.innerText = curNET.toFixed(1) + ' Gbps';
}
setInterval(updateDash, 2500);

// ===== GSAP Dynamic Background Scroll Animation =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const sectionsList = [
        { id: '#home', colors: ['#0a0a0a', '#1a1a2e', '#0f2027', '#203a43'] },
        { id: '#about', colors: ['#050505', '#121212', '#1a1a1a', '#0a0a0a'] },
        { id: '#skills', colors: ['#040a0f', '#0a1d2e', '#091c12', '#050a0f'] },
        { id: '#projects', colors: ['#0f0514', '#1a0a26', '#0a0a1a', '#12051a'] },
        { id: '#homelab', colors: ['#051010', '#0a1a1a', '#051212', '#020a0a'] },
        { id: '#achievements', colors: ['#1a0f05', '#261a0a', '#1a1205', '#1a0a05'] },
        { id: '#resume', colors: ['#0a0a0a', '#121212', '#0a0a0a', '#050505'] },
        { id: '#contact', colors: ['#050a14', '#0a1a2e', '#050a14', '#02050a'] }
    ];

    sectionsList.forEach((section) => {
        if(document.querySelector(section.id)) {
            ScrollTrigger.create({
                trigger: section.id,
                start: "top center",
                end: "bottom center",
                onEnter: () => updateBg(section.colors),
                onEnterBack: () => updateBg(section.colors)
            });
        }
    });

    function updateBg(colors) {
        if (document.body.classList.contains('light-mode')) return;
        gsap.to("#dynamic-bg", {
            backgroundImage: `linear-gradient(-45deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]})`,
            duration: 1.5,
            ease: "power2.out"
        });
    }

    gsap.to("#dynamic-bg", {
        backgroundPosition: "100% 50%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });
}

document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (hamburger) {
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
});

// ===== Certificate Modal Functions =====
window.viewCert = function(src) {
    const modal = document.getElementById('certModal');
    const img = document.getElementById('certImg');
    if(modal) modal.style.display = "block";
    if(img) img.src = src;
};
window.closeCert = function() {
    const modal = document.getElementById('certModal');
    if(modal) modal.style.display = "none";
};

// ===== Name Wave Animation on Entry =====
window.animateNameWave = function() {
    const nameH1 = document.querySelector(".name_container h1");
    if (!nameH1 || nameH1.dataset.animated === "true") return;
    const originalHTML = nameH1.innerHTML;
    const parts = originalHTML.split(/(<[^>]+>)/g);
    nameH1.innerHTML = parts.map(part => {
        if (part.startsWith("<")) return part;
        return part.split("").map(char => {
            if (char === " ") return "<span>&nbsp;</span>";
            return `<span class="intro-letter effect" style="display:inline-block">${char}</span>`;
        }).join("");
    }).join("");
    nameH1.dataset.animated = "true";
    if(typeof gsap !== 'undefined') {
        const isLight = document.body.classList.contains('light-mode');
        const baseColor = isLight ? '#1a1a2e' : '#fff';

        gsap.fromTo(".intro-letter",
            { scale: 1, color: baseColor },
            { 
                scale: 1.4, 
                color: "#29b6d4", 
                duration: 0.4, 
                stagger: 0.05, 
                ease: "power2.out", 
                yoyo: true, 
                repeat: 1 
            }
        );
    }
};

// ===== Site Protection =====
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.key === "F12" || (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "i" || e.key === "j"))) {
        e.preventDefault();
        return false;
    }
});
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

// ====== EMBEDDED CLI JAVASCRIPT ======
(function () {
    var cliMx = document.getElementById('cli-mx');
    if (!cliMx) return;
    var cliCx = cliMx.getContext('2d');
    var CLI_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ</>[]{}';
    var CLI_FS = 14;
    var cliCols, cliDrops;

    function initCliMx() {
        cliMx.width = window.innerWidth;
        cliMx.height = window.innerHeight;
        cliCols = Math.floor(cliMx.width / CLI_FS);
        cliDrops = Array(cliCols).fill(1);
    }
    initCliMx();
    window.addEventListener('resize', initCliMx);

    var cliMxInterval = null;
    function startCliMx() {
        if (cliMxInterval) return;
        cliMxInterval = setInterval(function () {
            cliCx.fillStyle = 'rgba(4,10,15,0.04)';
            cliCx.fillRect(0, 0, cliMx.width, cliMx.height);
            for (var i = 0; i < cliDrops.length; i++) {
                var r = Math.random();
                cliCx.font = CLI_FS + 'px IBM Plex Mono,monospace';
                var char = CLI_CHARS[Math.floor(Math.random() * CLI_CHARS.length)];
                if (r > .97) cliCx.fillStyle = 'rgba(200,235,255,1)';
                else if (r > .85) cliCx.fillStyle = 'rgba(74,144,184,1)';
                else cliCx.fillStyle = 'rgba(74,144,184,0.6)';
                cliCx.fillText(char, i * CLI_FS, cliDrops[i] * CLI_FS);
                if (cliDrops[i] * CLI_FS > cliMx.height && Math.random() > .976) cliDrops[i] = 0;
                cliDrops[i]++;
            }
        }, 60);
    }
    function stopCliMx() { clearInterval(cliMxInterval); cliMxInterval = null; }

    var cliBooted = false;
    var cliHistory = [], cliHistIdx = -1;
    var CMDS = ['help', 'whoismsl', 'summary', 'experience', 'skills', 'projects', 'homelab', 'services', 'casestudies', 'education', 'certgallery', 'achievements', 'techlibrary', 'analysis', 'socialproof', 'contact', 'clear', 'exit', 'ls', 'date', 'sudo', 'ping', 'top', 'matrix', 'neofetch'];
    var D = {
        whoismsl: '<span class="c-h">// WHO IS MSL</span>\n\n  <span class="c-grn">Name     :</span> Mohamed Sayid Lotfy\n  <span class="c-grn">Title    :</span> Network &amp; System Administrator\n  <span class="c-grn">Location :</span> Cairo, Egypt 🇪🇬\n  <span class="c-grn">Email    :</span> mohamed-sayid@outlook.com\n  <span class="c-grn">Phone    :</span> +20 150 333 3155\n  <span class="c-grn">LinkedIn :</span> linkedin.com/in/mohamedelsayid\n  <span class="c-grn">Status   :</span> <span class="c-grn">● Open to Work — Available Now</span>\n\n  <span class="c-ylw">Quick Bio:</span>\n  IT Specialist with 5+ years managing enterprise networks,\n  cloud solutions &amp; Medical IT. Currently holding dual roles\n  at Viion and Main Sharia Association Hospital.\n\n  <span class="c-ylw">Certifications:</span>\n  🥇 CCNA (ID: CSCO15040282 · Valid Nov 2028)\n  ⚙️  CCNP Enterprise: Core Networking\n  🖥️  MCSA 2016 (60 Hours)\n\n  <span class="c-ylw">Languages:</span>  Arabic (Native) · English (Advanced)\n  <span class="c-ylw">Military :</span>  Permanently Exempt',
        help: '<span class="c-h">// AVAILABLE COMMANDS</span>\n\n  <span class="c-ylw">Navigation:</span>\n  <span class="c-grn">1</span> / <span class="c-grn">whoismsl</span>      → Who is Mohamed Sayid Lotfy?\n  <span class="c-grn">2</span> / <span class="c-grn">summary</span>       → Professional overview\n  <span class="c-grn">3</span> / <span class="c-grn">experience</span>    → Full work history\n  <span class="c-grn">4</span> / <span class="c-grn">skills</span>        → Technical skills\n  <span class="c-grn">5</span> / <span class="c-grn">projects</span>      → Projects\n  <span class="c-grn">6</span> / <span class="c-grn">homelab</span>       → Homelab\n  <span class="c-grn">7</span> / <span class="c-grn">services</span>      → IT Services\n  <span class="c-grn">8</span> / <span class="c-grn">casestudies</span>   → Case Studies\n  <span class="c-grn">9</span> / <span class="c-grn">education</span>     → Academic background\n  <span class="c-grn">10</span>/ <span class="c-grn">certgallery</span>   → Certificates Gallery\n  <span class="c-grn">11</span>/ <span class="c-grn">achievements</span>  → Key wins &amp; milestones\n  <span class="c-grn">12</span>/ <span class="c-grn">techlibrary</span>   → Tech Library Base\n  <span class="c-grn">13</span>/ <span class="c-grn">analysis</span>      → Analysis\n  <span class="c-grn">14</span>/ <span class="c-grn">socialproof</span>   → Social Proof\n  <span class="c-grn">15</span>/ <span class="c-grn">contact</span>       → Contact &amp; social links\n\n  <span class="c-ylw">Utilities &amp; Fun:</span>\n  <span class="c-grn">ls</span>     → List all sections\n  <span class="c-grn">date</span>   → Current date &amp; time\n  <span class="c-grn">ping</span>   → Network speed check\n  <span class="c-grn">sudo</span>   → Root access test\n  <span class="c-grn">top</span>    → Real-time resources\n  <span class="c-grn">matrix</span> → Digital rain effect\n  <span class="c-grn">clear</span>  → Clear terminal\n  <span class="c-grn">exit</span>   → Back to Normal mode\n\n  <span class="c-dim">Tab=autocomplete · ↑↓=history · ESC=normal</span>',
        summary: '<span class="c-h">// PROFESSIONAL SUMMARY</span>\n5+ years IT experience · CCNA/CCNP certified\nDual roles: Viion (Network Admin) + Hospital (SysAdmin)\n75% network performance boost · 90% security incidents reduced',
        skills: '<span class="c-h">// SKILLS</span>\nNetwork: LAN/WAN/VLAN, Firewall, VPN, OSPF, Cisco IOS\nSystems: Windows Server, AD, DHCP/DNS, Hyper-V, VMware\nSecurity: Cybersecurity, Cloud Services, Endpoint Protection',
        contact: '<span class="c-h">// CONTACT</span>\n  📧 mohamed-sayid@outlook.com\n  📞 +20 150 333 3155\n  💼 linkedin.com/in/mohamedelsayid\n  <span class="c-grn">● Available Now</span>',
        ls: 'summary/ experience/ education/ achievements/ skills/ certifications/ homelab/ services/ certgallery/ techlibrary/ contact/ casestudies/ socialproof/ projects/',
        socialproof: '<span class="c-h">// SOCIAL PROOF</span>\n⭐ 8 LinkedIn Recommendations — 5-star average\n✓ CCNA ID: CSCO15040282 · Verified Cisco credential\n📊 75% network boost · 90% incidents reduced · 99%+ medical uptime\n💼 Currently holding 2 active roles simultaneously',
        casestudies: '<span class="c-h">// CASE STUDIES</span>\n🌐 Enterprise Network Overhaul — Viion [+75% throughput]\n🏥 Medical IT Stabilisation — Hospital [99%+ uptime]\n🛡️ Endpoint Security Hardening — 100% policy compliance\n🖥️ Legacy Server Migration — 60% cost reduction via virtualisation',
        experience: '<span class="c-h">// EXPERIENCE</span>\nNetwork &amp; System Admin — Viion [Jul 2024–Present]\nSystem Admin — Main Sharia Hospital [Sep 2024–Present]\nIT Specialist — Xceed [Apr–Aug 2024]\nTeam Leader — Mrsool [Nov 2023–Apr 2024]',
        education: '<span class="c-h">// EDUCATION</span>\n  <span class="c-ylw">Academic Degree:</span>\n  🎓 B.Sc. in Management Information Systems (MIS)\n     Al-Abbasiya Institute [2019–2023]\n\n  <span class="c-ylw">Professional Certifications:</span>\n  🥇 CCNA · Verified ID: CSCO15040282 [Valid Nov 2028]\n  ⚙️ CCNP Enterprise: Core Networking [2024]\n  🖥️ MCSA 2016 Server - 60 Hours [2025]\n  🛡️ Fortinet NSE 1, 2 &amp; 3 [In Progress]\n  ☁️ Microsoft Azure Fundamentals AZ-900',
        achievements: '<span class="c-h">// KEY ACHIEVEMENTS</span>\n  🏆 <span class="c-grn">Network Optimization:</span> Increased enterprise network throughput by 75% at Viion.\n  🏆 <span class="c-grn">Security Hardening:</span> Reduced security incidents by 90% across 5 branches.\n  🏆 <span class="c-grn">Infrastructure Modernization:</span> Migrated legacy servers to Hyper-V clusters — 60% cost reduction.\n  🏆 <span class="c-grn">Healthcare IT Stability:</span> 99.9% uptime for critical medical systems.',
        homelab: '<span class="c-h">// HOMELAB</span>\n  🖥️ VMware ESXi / Hyper-V Servers\n  ⚙️ Cisco GNS3/EVE-NG Emulations\n  🌐 pfSense / FortiGate VMs\n  🔐 Active Directory Test Domain',
        services: '<span class="c-h">// IT SERVICES</span>\n  🛠️ Network Design &amp; Implementation\n  🛡️ Penetration Testing &amp; Hardening\n  ☁️ P2V / Cloud Migrations\n  💾 Backup Systems Design',
        certgallery: '<span class="c-h">// CERTIFICATE GALLERY</span>\n  <span class="c-ylw">Networking:</span>\n  📜 CCNA (Cisco Certified Network Associate)\n  📜 CCNP Enterprise: Core Networking\n\n  <span class="c-ylw">Systems &amp; Servers:</span>\n  📜 MCSA 2016 (Microsoft Certified Solutions Associate)\n  📜 Active Directory &amp; Windows Server Administration\n\n  <span class="c-ylw">Security &amp; Cloud:</span>\n  📜 Fortinet NSE 1, NSE 2, NSE 3\n  📜 Microsoft Azure Fundamentals (AZ-900)',
        techlibrary: '<span class="c-h">// TECH LIBRARY BASE</span>\n  <span class="c-ylw">Reference Guides &amp; Baselines:</span>\n  📚 Cisco IOS Configuration Templates (VLANs, STP, OSPF, ACLs)\n  📚 Windows Server GPO Security Baselines &amp; Hardening\n  📚 Active Directory Best Practices &amp; Troubleshooting\n  📚 FortiGate/pfSense Firewall Rule Strategies\n  📚 Veeam Backup &amp; Replication 3-2-1 Strategy Guide\n  📚 VMware ESXi &amp; Hyper-V Optimization and P2V Migration\n  📚 Enterprise Wi-Fi Security (WPA3-Enterprise, RADIUS)\n  📚 Linux Server Security Baselines',
        analysis: '<span class="c-h">// SYSTEM &amp; PERFORMANCE ANALYSIS</span>\n  <span class="c-grn">Bandwidth Utilization:</span> Optimized traffic routing — 40% less WAN saturation.\n  <span class="c-grn">Server Resource Allocation:</span> Rebalanced VM resources across 12 VMs.\n  <span class="c-grn">Incident Response Time:</span> Reduced MTTR by 50% using proactive PRTG/Zabbix monitoring.\n  <span class="c-grn">Security Posture:</span> 100% endpoint compliance via centralized patching.',
        projects: '<span class="c-h">// PROJECTS</span>\n  🏥 Hospital Network Modernization [VLAN/OSPF/Security]\n  🔐 Enterprise Active Directory Migration [Windows Server/GPO]\n  ☁️ Hyper-V Server Virtualization [Disaster Recovery]\n  🔥 Fortigate Firewall &amp; VPN Deployment [Network Security]\n  💾 Veeam Backup &amp; Replication [3-2-1 Strategy]\n  🛡️ Endpoint Threat Response Setup [Sophos/Kaspersky]\n  📶 Secure Enterprise Wireless [RADIUS/WPA3]\n  ⚙️ WSUS Automated Patch Management [Centralized Updates]\n  🔌 Cisco Core Switch Port Security [Access Control]\n  ☁️ Azure Cloud Hybrid Connectivity [Azure VMs/VPN]'
    };

    var NUM_MAP = { '1': 'whoismsl', '2': 'summary', '3': 'experience', '4': 'skills', '5': 'projects', '6': 'homelab', '7': 'services', '8': 'casestudies', '9': 'education', '10': 'certgallery', '11': 'achievements', '12': 'techlibrary', '13': 'analysis', '14': 'socialproof', '15': 'contact' };

    function cliPrint(html, cls) {
        cls = cls || 'c-out';
        var el = document.createElement('div');
        el.className = 'cline ' + cls;
        el.innerHTML = html;
        var body = document.getElementById('cli-body');
        if(body) { body.appendChild(el); body.scrollTop = 99999; }
    }

    function bootCLI() {
        cliPrint('<span class="c-logo">████████╗███████╗███████╗ █████╗ \n╚══██╔══╝██╔════╝██╔════╝██╔══██╗\n   ██║   █████╗  █████╗  ███████║\n   ██║   ██╔══╝  ██╔══╝  ██╔══██║\n   ██║   ███████╗██║     ██║  ██║\n   ╚═╝   ╚══════╝╚═╝     ╚═╝  ╚═╝</span>');
        cliPrint('<span class="c-h">Mohamed Sayid Lotfy — Network &amp; System Administrator</span>');
        cliPrint('<span class="c-dim">────────────────────────────────────────</span>');
        var menuItems = [
            ['Who is Mohamed Sayid Lotfy?', '1', 'whoismsl'],
            ['Professional Summary', '2', 'summary'],
            ['Work Experience', '3', 'experience'],
            ['Technical Skills', '4', 'skills'],
            ['Projects', '5', 'projects'],
            ['Homelab', '6', 'homelab'],
            ['IT Services', '7', 'services'],
            ['Case Studies', '8', 'casestudies'],
            ['Education', '9', 'education'],
            ['Certificates Gallery', '10', 'certgallery'],
            ['Key Achievements', '11', 'achievements'],
            ['Tech Library Base', '12', 'techlibrary'],
            ['Analysis', '13', 'analysis'],
            ['Social Proof', '14', 'socialproof'],
            ['Contact Info', '15', 'contact']
        ];
        menuItems.forEach(function (item) {
            var label = item[0], num = item[1], cmd = item[2];
            var padded = label + Array(Math.max(0, 31 - label.length)).join(' ');
            cliPrint('<span class="c-ylw">' + padded + '</span><span class="c-dim">→ press</span> <span class="c-grn">' + num + '</span> <span class="c-dim">or type</span> <span class="c-grn">' + cmd + '</span>');
        });
        cliPrint('<span class="c-dim">────────────────────────────────────────</span>');
        cliPrint('<span class="c-dim">Tab=autocomplete · ↑↓=history · ESC=normal · clear · exit</span>');
        cliPrint('');
    }

    function runCLI(cmd) {
        cmd = cmd.trim().toLowerCase();
        if (!cmd) return;
        cliHistory.unshift(cmd); cliHistIdx = -1;
        var mapped = NUM_MAP[cmd] || cmd;
        cliPrint('<span class="c-cmd">$ ' + cmd + (mapped !== cmd ? ' → ' + mapped : '') + '</span>');
        if (mapped === 'clear' || cmd === 'clear') { 
            const body = document.getElementById('cli-body');
            if(body) body.innerHTML = ''; 
            bootCLI(); 
            return; 
        }
        if (mapped === 'exit' || cmd === 'exit') { window.closeCLI(); return; }
        if (mapped === 'date' || cmd === 'date') { cliPrint(new Date().toString()); return; }
        if (mapped === 'menu' || cmd === 'menu') { 
            const body = document.getElementById('cli-body');
            if(body) body.innerHTML = ''; 
            bootCLI(); 
            return; 
        }
        if (cmd === 'sudo') { cliPrint('<span class="c-err">Permission denied: user "Guest" is not in the sudoers file. This incident will be reported.</span>'); return; }
        if (cmd === 'ping') {
            cliPrint('PING msl.it (192.168.1.1): 56 data bytes');
            var cnt = 0;
            var pInt = setInterval(function () {
                cliPrint('64 bytes from 192.168.1.1: icmp_seq=' + cnt + ' ttl=64 time=' + (Math.random() * 5 + 10).toFixed(3) + ' ms');
                cnt++;
                if (cnt >= 4) {
                    clearInterval(pInt);
                    cliPrint('--- msl.it ping statistics ---');
                    cliPrint('4 packets transmitted, 4 received, 0.0% packet loss');
                }
            }, 500);
            return;
        }
        if (cmd === 'matrix') {
            cliPrint('<span class="c-grn">Initializing Digital Rain Protocol...</span>');
            setTimeout(function () { cliPrint('<span class="c-grn">Digital Rain sequence complete. Logs sanitized.</span>'); }, 8000);
            return;
        }
        if (cmd === 'top') {
            cliPrint('<span class="c-h">// SYSTEM RESOURCES (Live)</span>');
            cliPrint('Tasks: 14 total, 1 running, 13 sleeping');
            cliPrint('%Cpu(s): ' + (Math.random() * 10 + 2).toFixed(1) + ' us, ' + (Math.random() * 5).toFixed(1) + ' sy');
            cliPrint('MiB Mem: 65536 total, 42100 free, 12400 used');
            cliPrint('');
            cliPrint('<span class="c-dim">PID USER      PR  NI    VIRT    RES  %CPU  %MEM COMMAND</span>');
            cliPrint('102 guest     20   0   14.2g   1.2g   2.4   1.8  portfolio_engine');
            cliPrint('105 guest     20   0    8.4g   0.6g   1.2   0.9  cli_terminal');
            return;
        }
        if (cmd === 'neofetch') {
            var cores = navigator.hardwareConcurrency || '8';
            cliPrint('       <span class="c-acc">.---.</span>       <span class="c-acc">guest@MSL_OS</span>');
            cliPrint('      <span class="c-acc">/     \\</span>      <span class="c-dim">------------</span>');
            cliPrint('      <span class="c-acc">\\.@ @./</span>      <span class="c-acc">OS:</span> MSL_OS v2.0.4');
            cliPrint('      <span class="c-acc">/  _  \\</span>      <span class="c-acc">Kernel:</span> 6.1.0-21-amd64');
            cliPrint('     <span class="c-acc">/|     |\\</span>     <span class="c-acc">Uptime:</span> 24 days, 14 hours');
            cliPrint('    <span class="c-acc">/ \\___/ \\</span>    <span class="c-acc">Shell:</span> portfolio-sh 5.1');
            cliPrint('   <span class="c-acc">/_________\\</span>   <span class="c-acc">CPU:</span> ' + cores + ' Logical Cores');
            cliPrint('   <span class="c-acc">|         |</span>   <span class="c-acc">GPU:</span> WebGL Accelerated');
            return;
        }
        if (D[mapped]) { cliPrint(D[mapped]); cliPrint(''); }
        else {
            var matches = CMDS.filter(function (c) { return c.indexOf(cmd) === 0; });
            if (matches.length) cliPrint('<span class="c-dim">Did you mean: ' + matches.join(', ') + '?</span>');
            else cliPrint('<span class="c-err">command not found: "' + cmd + '" · type \'help\' or press 1-15</span>');
        }
    }

    var inp = document.getElementById('cli-input');
    if(inp) {
        inp.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') { var v = inp.value; inp.value = ''; runCLI(v); }
            else if (e.key === 'Tab') {
                e.preventDefault();
                var v = inp.value.trim().toLowerCase();
                var matches = CMDS.filter(function (c) { return c.indexOf(v) === 0; });
                if (matches.length === 1) inp.value = matches[0];
                else if (matches.length > 1) cliPrint('<span class="c-dim">→ ' + matches.join('  ') + '</span>');
            }
            else if (e.key === 'ArrowUp') { e.preventDefault(); if (cliHistIdx < cliHistory.length - 1) { cliHistIdx++; inp.value = cliHistory[cliHistIdx] || ''; } }
            else if (e.key === 'ArrowDown') { e.preventDefault(); if (cliHistIdx > 0) { cliHistIdx--; inp.value = cliHistory[cliHistIdx] || ''; } else { cliHistIdx = -1; inp.value = ''; } }
        });
    }

    const overlay = document.getElementById('cli-overlay');
    if(overlay) {
        overlay.addEventListener('click', function () { if(inp) inp.focus(); });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('cli-active')) {
            window.closeCLI();
        }
    });

    window.openCLI = function () {
        if(overlay) {
            overlay.classList.add('cli-active');
            if (!cliBooted) { bootCLI(); cliBooted = true; }
            startCliMx();
            if(inp) inp.focus();
        }
    };
    window.closeCLI = function () {
        if(overlay) {
            overlay.classList.remove('cli-active');
            stopCliMx();
        }
    };
})();
