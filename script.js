/*1. THE RULE DICTIONARY (SEMANTIC EXPANSION ENGINE)
  Instead of just wrapping user text, we check for regex keyword triggers and inject professional domain-specific constraints algorithmically.*/
const ENHANCEMENT_RULES=[
  {
    category:"Web Scraping",
    // Regular expressions (regex) checking for words like 'scrape', 'crawl', or library names
    keywords:[/scrape/i, /crawl/i, /beautifulsoup/i, /puppeteer/i, /scrapy/i],
    constraints:[
      "Implement automatic adaptive rate-limiting and customized request delays.",
      "Include rotational User-Agent headers to protect execution flow from anti-bot mechanisms.",
      "Incorporate structured try/except mechanisms handling network exceptions and malformed HTML schemas.",
      "Compile the final parsed data blocks directly into structured, normalized JSON outputs."
    ]
  },
  {
    category:"Database & SQL",
    keywords:[/sql/i, /database/i, /query/i, /join/i, /index/i, /postgres/i, /mysql/i],
    constraints: [
      "Structure optimized database expressions, completely avoiding inefficient global queries (e.g., SELECT *).",
      "Explicitly detail query execution patterns, indexing optimizations, and join structures.",
      "Build proper handling profiles for potential NULL data values.",
      "Document the estimated relational database complexity (Time/Space analysis)."
    ]
  },
  {
    category:"Bug Fixing & Debugging",
    keywords:[/bug/i, /fix/i, /error/i, /not working/i, /exception/i, /debug/i],
    constraints:[
      "Explain the exact code execution bottleneck or failure point in 1-2 clear, conceptual sentences.",
      "Produce the corrected solution block in its entirety without truncated code blocks.",
      "Add line-by-line code documentation detailing why the fix solves execution or memory exceptions."
    ]
  },
  {
    category:"Science & Physics",
    keywords:[/law of motion/i, /physics/i, /gravity/i, /science/i, /energy/i, /dynamics/i],
    constraints:[
      "Break down abstract scientific formulations into highly intuitive real-world analogies.",
      "Avoid dry textbook translations; map complex math back to physical phenomena.",
      "Organize the logical structure into: 1. The Underlying Core Principle, 2. Interactive Real-World Illustration, 3. Critical Edge Cases/Implications."
    ]
  }
];
/* Default fallbacks in case the user types something general that doesn't trigger specific domain keywords */
const DEFAULT_CONSTRAINTS=[
  "Build highly modular, self-contained architectures prioritizing clean design pattern conventions.",
  "Gracefully address failure vectors, edge scenarios, and computational limits.",
  "Avoid high-level summaries and small talk. Deliver execution blocks immediately."
];
/*
   2. THE CORE PROMPT GENERATION ENGINE
   Takes live user inputs from the DOM, maps variables, and compiles the master string.*/
function enhancePrompt(userInput, selectedRole, selectedIntensity) {
  // Filter through our dictionary: if any regex keyword matches the user's text, grab that rule object
  const matchedRules=ENHANCEMENT_RULES.filter(rule => 
    rule.keywords.some(regex => regex.test(userInput))
  );
  // Map the selected dropdown role into an authoritative system persona directive
  let roleSnippet="";
  if (selectedRole==='genius') {
    roleSnippet="Act as an elite Principal Software Architect with 20+ years of deep system design experience. Provide highly performant code paradigms.";
  } else if (selectedRole==='brutal') {
    roleSnippet="Act as a brutally honest, world-class code reviewer. Critically assess naive developer architectures and substitute optimization-first solutions.";
  } else if(selectedRole === 'academic') {
    roleSnippet="Act as an authoritative Ivy League Research Lead. Maintain extreme logical precision, scientific methodologies, and systematic proof structures.";
  } else {
    roleSnippet="Act as a hyper-focused Context Goblin. By-pass standard introductions, delivering pure structural engineering code-blocks instantly.";
  }
  // Map the strictness slider (1, 2, or 3) into an operational parameter
  let intensitySnippet="";
  if (selectedIntensity ==="1") {
    intensitySnippet ="Ensure baseline structural modularity, modern design specifications, and clean readable blocks.";
  } else if (selectedIntensity==="2") {
    intensitySnippet="Enforce rigorous error profiles, mathematical processing optimization, and clear modular segmentation.";
  } else {
    intensitySnippet="CRITICAL METRIC OVERRIDES ENFORCED: Prioritize hyper-optimized execution efficiency, mitigate system memory footprints, and restrict output strictly to zero-overhead programmatic primitives.";
  }

  // If keywords matched, extract their constraint arrays and flatten them into one list.
  // If nothing matched, use our clean DEFAULT_CONSTRAINTS array.
  const activeConstraints = matchedRules.length >0
    ? matchedRules.flatMap(r=>r.constraints)
    : DEFAULT_CONSTRAINTS;
  // Transform JavaScript array items into a clean Markdown bulleted list string
  const formattedConstraints = activeConstraints.map(c => `- ${c}`).join("\n");
  // Compile and return the master architectural prompt using template literals
  return `[SYSTEM DIRECTIVE: CORE ARCHITECTURE OVERRIDE]
${roleSnippet}

[CONTEXT OF WORK]
User Intent Objective:"${userInput}"

[MANDATORY OPERATIONAL CONSTRAINTS]
- ${intensitySnippet}
${formattedConstraints}
- Format all raw terminal operations and code output with strict Markdown tagging.

[EXECUTION SEQUENCE]
Begin step-by-step structural implementation now.`;
}
/* 
   3. DOM EVENT ORCHESTRATION
   Waits until the HTML page finishes loading into browser memory before attaching event listeners.*/
document.addEventListener("DOMContentLoaded",()=> {
    // PAGE 1: THE KITCHEN (Interactive Generator Logic)
    const generateBtn=document.getElementById('generate-btn');
    // Safety Check: We only run Kitchen code if 'generate-btn' actually exists on the loaded page
    if (generateBtn) {
        generateBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents accidental page reloads if button sits inside a <form>
            // Grab live values typed/selected by the user
            const userInput=document.getElementById('user-intent').value.trim();
            const aiRole=document.getElementById('ai-role').value;
            const intensity=document.getElementById('intensity').value;
            // Validation: Stop execution and alert the user if they clicked generate on an empty text box
            if (!userInput) {
                alert("Bestie, you gotta type something first! The box is empty.");
                return;
            }
            // Run our live data through the enhancement engine
            const cookedPrompt=enhancePrompt(userInput, aiRole, intensity);

            // Locate our DOM elements for displaying output
            const outputBox=document.getElementById('output-window');
            const outputText=document.getElementById('prompt-output');
            
            // Inject text, remove the 'invisible' class to reveal the box, and smoothly scroll down to it
            if (outputBox && outputText) {
                outputText.textContent = cookedPrompt;
                outputBox.classList.remove('invisible');
                outputBox.scrollIntoView({ behavior:'smooth'});
            }
        });
        // Copy button inside The Kitchen output terminal
        document.getElementById('copy-btn').addEventListener('click', (e)=> {
            const outputText=document.getElementById('prompt-output').textContent;
            // Use standard Web Clipboard API to copy text
            navigator.clipboard.writeText(outputText).then(()=>{
                const btn = e.target;
                // Temporary visual button change to confirm copy success
                btn.textContent="COPIED! 🔥";
                btn.style.background="#FF66B2";
                btn.style.color="white";
                // Reset button text and styling back to normal after 2 seconds (2000ms)
                setTimeout(()=>{
                    btn.textContent="COPY TO CLIPBOARD";
                    btn.style.background="#FFFFFF";
                    btn.style.color="#1A1A1A";
                }, 2000);
            });
        });
    }

  
    // PAGE 2: THE VAULT (Template Library Copy Logic)
    const vaultButtons=document.querySelectorAll('.vault-copy-btn');
    // Safety Check: Only execute if we found vault buttons on the currently loaded page
    if (vaultButtons.length>0){
        vaultButtons.forEach(button =>{
            button.addEventListener('click', (e) =>{
                // Find the closest parent container card of the specific button clicked
                const card=e.target.closest('.vault-card');
                // Extract only the raw template text inside that specific card
                const rawText=card.querySelector('.vault-raw-text').textContent;
                navigator.clipboard.writeText(rawText).then(() =>{
                    const btn=e.target;
                    const originalText=btn.textContent;
                    // Temporary confirmation UI
                    btn.textContent="COPIED! ⚡";
                    btn.style.background="#27C93F";
                    btn.style.color="#1A1A1A";
                    // Revert UI back to normal after 1.8 seconds
                    setTimeout(()=>{
                        btn.textContent=originalText;
                        btn.style.background="#FFFFFF";
                        btn.style.color="#1A1A1A";
                    },1800);
                });
            });
        });
    }
});
