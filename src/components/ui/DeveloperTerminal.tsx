'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Terminal, Send, Cpu } from 'lucide-react';

interface CommandOutput {
    type: 'input' | 'output' | 'error';
    text: string;
    isHtml?: boolean;
}

export function DeveloperTerminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandOutput[]>([
        { type: 'output', text: 'Welcome to Osama Shakaki\'s Interactive Terminal! [v1.0.0]' },
        { type: 'output', text: 'Type "help" to see list of available commands.' },
        { type: 'output', text: '' },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isExecutingAgent, setIsExecutingAgent] = useState(false);

    const terminalEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isFirstRender = useRef(true);

    // Auto-scroll to bottom of terminal
    const scrollToBottom = useCallback(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        scrollToBottom();
    }, [history, scrollToBottom]);

    // Auto-focus input when terminal body is clicked (unless text selection is active)
    const focusInput = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a') || target.closest('button') || target.closest('input');
        if (isInteractive) return;

        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            return;
        }

        inputRef.current?.focus();
    };

    const handleCommand = async (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        // Add input to history
        const newHistory = [...history, { type: 'input' as const, text: `visitor@osamashakaki.dev:~$ ${trimmed}` }];
        setCommandHistory(prev => [trimmed, ...prev]);
        setHistoryIndex(-1);

        const lowerCmd = trimmed.toLowerCase();

        if (lowerCmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        if (lowerCmd === 'help') {
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Available commands:' },
                { type: 'output', text: '  about             Display biography & professional summary' },
                { type: 'output', text: '  skills            List technical skills & credentials' },
                { type: 'output', text: '  projects          Showcase flagship AI/ML projects' },
                { type: 'output', text: '  neofetch          Display system information & bio' },
                { type: 'output', text: '  run monjez-agent  Execute a simulated Multi-Agent AI run' },
                { type: 'output', text: '  contact           Show social channels & email details' },
                { type: 'output', text: '  clear             Clear the terminal screen' },
            ]);
            setInput('');
            return;
        }

        if (lowerCmd === 'about') {
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Osama Ahmad Anas Shakaki - AI Engineer & Data Scientist' },
                { type: 'output', text: '---------------------------------------------------' },
                { type: 'output', text: 'Honours Computer Science graduate from the Islamic University of Madinah.' },
                { type: 'output', text: 'Multi-award-winning innovator, capturing 1st Place at the Agenticthon 2026' },
                { type: 'output', text: 'and the Future Fintech Hackathon.' },
                { type: 'output', text: 'Specializes in Machine Learning, Deep Learning, NLP, and building production-ready' },
                { type: 'output', text: 'Multi-Agent systems and Retrieval-Augmented Generation (RAG) pipelines.' },
            ]);
            setInput('');
            return;
        }

        if (lowerCmd === 'skills') {
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Technical Arsenal & Competency Matrix:' },
                { type: 'output', text: '======================================' },
                { type: 'output', text: 'Languages:       Python, Java, JavaScript, SQL, HTML/CSS' },
                { type: 'output', text: 'AI & ML:         TensorFlow, PyTorch, LangChain, Scikit-learn, YOLO, Azure AI' },
                { type: 'output', text: 'Vector DBs:      ChromaDB, Pinecone, Qdrant' },
                { type: 'output', text: 'Backend/Web:     Node.js, Express.js, Next.js, React' },
                { type: 'output', text: 'DevOps & Tools:  Docker, Git, GitHub, VS Code, Jupyter' },
            ]);
            setInput('');
            return;
        }

        if (lowerCmd === 'projects') {
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Flagship Innovations:' },
                { type: 'output', text: '=======================' },
                { type: 'output', text: '1. AI EEG Signal Converter' },
                { type: 'output', text: '   Description: Convert EEG brain waves into Arabic words with 94% classification accuracy.' },
                { type: 'output', text: '   Stack: Python, TensorFlow, Scikit-learn, Signal Processing' },
                { type: 'output', text: '' },
                { type: 'output', text: '2. Monjez: Multi-Agent AI Platform (1st Place Agenticthon 2026)' },
                { type: 'output', text: '   Description: Automated research paper conversion into actionable structured outputs via multi-agent orchestration.' },
                { type: 'output', text: '   Stack: LangChain, Multi-Agent Swarms, RAG, Python' },
                { type: 'output', text: '' },
                { type: 'output', text: '3. Loan Recommendation Platform (1st Place Future Fintech Hackathon)' },
                { type: 'output', text: '   Description: Data-driven creditworthiness and loan advisor built within 48 hours.' },
                { type: 'output', text: '   Stack: Python, Machine Learning, Data Analytics' },
                { type: 'output', text: '' },
                { type: 'output', text: '4. AI Smart Vision System (Scai AI League Hackathon)' },
                { type: 'output', text: '   Description: Real-time visual assistance and match commentary for visually impaired users.' },
                { type: 'output', text: '   Stack: Computer Vision, OpenCV, YOLO, NLP' },
            ]);
            setInput('');
            return;
        }

        if (lowerCmd === 'neofetch') {
            const asciiLogo = `
    .---.      
   /     \\     
   | () () |   
    \\  ^  /    
     |||||     
     |||||     
`;
            setHistory([
                ...newHistory,
                { 
                    type: 'output', 
                    isHtml: true,
                    text: `<div class="flex flex-col sm:flex-row gap-6 font-mono leading-relaxed text-zinc-300">
<pre class="text-blue-500 font-bold hidden sm:block">${asciiLogo}</pre>
<div>
  <span class="text-blue-400 font-bold">osama</span>@<span class="text-blue-400 font-bold">shakaki-dev</span>
  <span>---------------------</span>
  <span><span class="text-blue-400 font-bold">OS:</span> Osama Shakaki Portfolio v1.0.0</span>
  <span><span class="text-blue-400 font-bold">Host:</span> Islamic University of Madinah</span>
  <span><span class="text-blue-400 font-bold">Kernel:</span> Next.js 16 + Tailwind CSS</span>
  <span><span class="text-blue-400 font-bold">Uptime:</span> 22 years (Est. 2004)</span>
  <span><span class="text-blue-400 font-bold">Location:</span> Riyadh, Saudi Arabia</span>
  <span><span class="text-blue-400 font-bold">Role:</span> AI Engineer / Data Scientist</span>
  <span><span class="text-blue-400 font-bold">GPA:</span> 4.57/5.0 (Second Class Honors)</span>
  <span><span class="text-blue-400 font-bold">Awards:</span> 1st Place Agenticthon & Fintech Hackathons</span>
  <span><span class="text-blue-400 font-bold">Shell:</span> bash / interactive-web</span>
</div>
</div>` 
                }
            ]);
            setInput('');
            return;
        }

        if (lowerCmd === 'run monjez-agent' || lowerCmd === 'run monjez') {
            setIsExecutingAgent(true);
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Initializing Monjez Swarm Orchestrator...' },
            ]);
            setInput('');

            // Simulate streaming agent steps
            const steps = [
                { delay: 600, text: '🤖 [Orchestrator] Spawning agent team: [Researcher-Agent, Writer-Agent, Formatter-Agent]' },
                { delay: 1200, text: '🔍 [Researcher-Agent] Querying arXiv database for "Agentic Reasoning in LLMs"...' },
                { delay: 1800, text: '📥 [Researcher-Agent] Found 3 papers. Extracting abstract, dataset features, and key charts...' },
                { delay: 2400, text: '✍️ [Writer-Agent] Consolidating research findings and drafting action summary...' },
                { delay: 3000, text: '🔧 [Formatter-Agent] Beautifying markdown document structures and validating schema...' },
                { delay: 3600, text: '🎉 [SUCCESS] Monjez Swarm execution completed in 3.6s!' },
                { delay: 3800, text: '📁 Output generated: /workspace/outputs/research_summary.md (4.2 KB)' },
            ];

            let accumulatedHistory = [
                ...newHistory,
                { type: 'output' as const, text: 'Initializing Monjez Swarm Orchestrator...' },
            ];

            for (const step of steps) {
                await new Promise(resolve => setTimeout(resolve, step.delay - (steps[steps.indexOf(step) - 1]?.delay || 0)));
                accumulatedHistory = [...accumulatedHistory, { type: 'output' as const, text: step.text }];
                setHistory(accumulatedHistory);
            }
            setIsExecutingAgent(false);
            return;
        }

        if (lowerCmd === 'contact') {
            setHistory([
                ...newHistory,
                { type: 'output', text: 'Social Hub & Contact Details:' },
                { type: 'output', text: '=============================' },
                { type: 'output', text: 'Email:     Osamash040@gmail.com' },
                { type: 'output', text: 'GitHub:    https://github.com/OsamaShakaki' },
                { type: 'output', text: 'LinkedIn:  https://linkedin.com/in/osama-shakaki' },
                { type: 'output', text: 'X (Twitter): https://x.com/OsamaSh_CS' },
                { type: 'output', text: 'Discord:   osama200_' },
            ]);
            setInput('');
            return;
        }

        // Default error command output
        setHistory([
            ...newHistory,
            { type: 'error', text: `bash: command not found: ${trimmed}. Type "help" to see available commands.` }
        ]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isExecutingAgent) {
            e.preventDefault();
            return;
        }

        if (e.key === 'Enter') {
            handleCommand(input);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const newIndex = historyIndex + 1;
            if (newIndex < commandHistory.length) {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = historyIndex - 1;
            if (newIndex >= 0) {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    return (
        <section id="terminal" className="w-full max-w-[760px] mx-auto px-6 py-6 scroll-mt-24">
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <h2 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-muted-foreground">Interactive Portfolio Shell</h2>
                </div>

                <div 
                    onClick={focusInput}
                    data-lenis-prevent
                    className="w-full h-[400px] bg-zinc-950/95 dark:bg-black/95 border-2 border-zinc-300 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs text-zinc-300 dark:text-zinc-300 cursor-text group focus-within:border-blue-500/50 transition-all duration-300 selection:bg-blue-500/30 selection:text-white"
                >
                    {/* Terminal Window Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 dark:bg-zinc-900 border-b border-zinc-200/10 select-none flex-shrink-0">
                        {/* macOS style buttons */}
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        {/* Terminal Title */}
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">guest@osamashakaki.dev: ~</span>
                        {/* Terminal Icon */}
                        <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                    </div>

                    {/* Terminal Console Output Logs */}
                    <div 
                        data-lenis-prevent
                        className="flex-1 overflow-y-auto p-4 space-y-2 select-text overscroll-contain"
                    >
                        {history.map((log, i) => (
                            <div key={i} className="whitespace-pre-wrap break-all leading-relaxed">
                                {log.type === 'input' ? (
                                    <div className="text-zinc-300 font-bold">{log.text}</div>
                                ) : log.type === 'error' ? (
                                    <div className="text-red-400">{log.text}</div>
                                ) : log.isHtml ? (
                                    <div dangerouslySetInnerHTML={{ __html: log.text }} />
                                ) : (
                                    <div className="text-zinc-300 dark:text-zinc-200">{log.text}</div>
                                )}
                            </div>
                        ))}
                        
                        {/* Command Input Prompt Line */}
                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-blue-400 font-bold flex-shrink-0">visitor@osamashakaki.dev:~$</span>
                            <div className="relative flex-1 flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isExecutingAgent}
                                    className="w-full bg-transparent border-none outline-none text-zinc-200 caret-blue-500 focus:ring-0 p-0 text-xs font-mono select-text"
                                    placeholder={isExecutingAgent ? 'Executing agent...' : ''}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                />
                                {input === '' && !isExecutingAgent && (
                                    <span className="absolute left-0 text-zinc-600 pointer-events-none select-none text-[10px] sm:text-xs">
                                        help / neofetch / run monjez-agent
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => handleCommand(input)}
                                disabled={isExecutingAgent || !input.trim()}
                                className="p-1 text-zinc-500 hover:text-blue-500 disabled:opacity-30 transition-colors flex-shrink-0"
                            >
                                <Send className="w-3 h-3" />
                            </button>
                        </div>

                        <div ref={terminalEndRef} />
                    </div>
                </div>
            </div>
        </section>
    );
}
