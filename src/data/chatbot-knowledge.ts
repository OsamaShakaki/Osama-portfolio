export interface KnowledgeSection {
    id: string;
    titleEn: string;
    titleAr: string;
    contentEn: string;
    contentAr: string;
    keywords: string[];
}

export interface InterviewQA {
    id: string;
    questionEn: string;
    questionAr: string;
    answerEn: string; // Written in first-person ("I")
    answerAr: string; // Written in first-person ("أنا / قمت")
    keywords: string[];
}

export const personalInfo = {
    nameEn: "Osama Ahmad Anas Shakaki",
    nameAr: "أسامة أحمد أنس شققي",
    birthDate: "2004-02-12", // Birthday: February 12, 2004
    email: "Osamash040@gmail.com",
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    github: "https://github.com/OsamaShakaki",
    linkedin: "https://linkedin.com/in/osama-shakaki",
    discordUsername: "osama200_",
    discordUrl: "https://discord.com/users/osama200_",
    currentAge: (): number => {
        const birth = new Date("2004-02-12");
        // We calculate age relative to current date.
        // In June 2026, he is 22.
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    }
};

export const chatbotKnowledge: KnowledgeSection[] = [
    {
        id: "personal_profile",
        titleEn: "Personal Profile",
        titleAr: "الملف الشخصي",
        contentEn: `Osama Ahmad Anas Shakaki is a high-achieving Honours Computer Science graduate from the Islamic University of Madinah. He is an AI Engineer and Data Scientist who has established himself as a multi-award-winning innovator, winning first place in two prestigious hackathons in Saudi Arabia: Agenticthon 2026 (Monjez platform) and the Future Fintech Hackathon. He is skilled in Python, Machine Learning, Deep Learning, Natural Language Processing, and integrating LLMs and multi-agent systems into scalable applications. In 2026, he is 22 years old. He resides in Riyadh, Saudi Arabia, and is open to opportunities in AI engineering, data science, and agentic AI systems.`,
        contentAr: `أسامة أحمد أنس شققي هو خريج علوم حاسب بمرتبة الشرف من الجامعة الإسلامية بالمدينة المنورة. يعمل كمهندس ذكاء اصطناعي وعالم بيانات، وأثبت جدارته كمبتكر فائز بجوائز متعددة، حيث حقق المركز الأول في هاكاثونين مرموقين في المملكة العربية السعودية: هاكاثون أنجيكثون 2026 (منصة منجز لعملاء الذكاء الاصطناعي) وهاكاثون مستقبل الفينتك. أسامة يمتلك خبرة عميقة في لغة البايثون، وتعلم الآلة، والتعلم العميق، ومعالجة اللغات الطبيعية (NLP)، ودمج النماذج اللغوية الضخمة (LLMs) وأنظمة الوكلاء المتعددين (Multi-Agent Systems). في عام 2026 يبلغ من العمر 22 عاماً. يقيم في الرياض، المملكة العربية السعودية، وهو مستعد للانضمام لفرص عمل في هندسة الذكاء الاصطناعي وهندسة أنظمة الوكلاء الذكية.`,
        keywords: ["osama shakaki", "who is osama", "biography", "personal profile", "location", "birthday", "أسم أسامة", "من هو أسامة", "سيرة أسامة", "تولد"]
    },
    {
        id: "recruiter_insights",
        titleEn: "Recruiter Insights & Work Preferences",
        titleAr: "معلومات للموظفين وتفضيلات العمل",
        contentEn: `For recruiters and hiring managers:
- **Key Strengths**: Rapid prototyping, technical leadership, complex problem-solving, building production-ready multi-agent systems, and processing biological signals (EEG).
- **Target Roles**: AI Engineer, Machine Learning Engineer, NLP Engineer, Data Scientist, Full-Stack Developer.
- **Location & Relocation**: Currently based in Riyadh, Saudi Arabia. Fully open to relocation within the GCC region (e.g., UAE, Qatar) or other major tech hubs.
- **Work Preferences**: Open to remote, hybrid, or full-time on-site positions.
- **Key Technical Interests**: Agentic workflows (LangGraph/CrewAI), Retrieval-Augmented Generation (RAG), healthcare AI applications, fintech automation, and scalable backend platforms.
- **Notice Period**: Immediately available for interviews and onboarding.`,
        contentAr: `معلومات تهم مسؤولي التوظيف ومديري التوظيف:
- **أبرز نقاط القوة**: بناء النماذج الأولية السريعة، القيادة التقنية للمشاريع، حل المشكلات المعقدة، تطوير أنظمة الوكلاء المتعددين الجاهزة للإنتاج، ومعالجة الإشارات الحيوية (EEG).
- **الأدوار المستهدفة**: مهندس ذكاء اصطناعي (AI Engineer)، مهندس تعلم آلة (ML Engineer)، مهندس معالجة لغات طبيعية (NLP)، عالم بيانات (Data Scientist)، مطور ويب متكامل (Full-Stack Developer).
- **الموقع والانتقال**: يقيم حالياً في الرياض، المملكة العربية السعودية. وهو على استعداد تام للانتقال للعمل داخل المملكة أو في دول الخليج (مثل الإمارات أو قطر).
- **تفضيلات العمل**: منفتح على العمل الحضوري الكامل، أو الهجين (Hybrid)، أو العمل عن بعد (Remote).
- **الاهتمامات التقنية**: تدفقات العمل المعتمدة على الوكلاء (Agentic workflows)، استرجاع المعلومات المعزز بالتوليد (RAG)، تطبيقات الذكاء الاصطناعي في الرعاية الصحية، الأتمتة المالية، والأنظمة الخلفية القابلة للتوسع.
- **فترة الإشعار (Notice Period)**: جاهز ومتاح للعمل الفوري والمقابلات الشخصية مباشرة.`,
        keywords: ["hiring", "recruit", "relocate", "remote", "hybrid", "salary", "job", "strengths", "notice", "أتوظف", "توظيف", "عمل", "عن بعد", "حضوري", "انتقال", "موقع", "جاهزية", "راتب"]
    },
    {
        id: "education_deep_dive",
        titleEn: "Education Deep Dive",
        titleAr: "تفاصيل التعليم والتحصيل الأكاديمي",
        contentEn: `Osama graduated with a Bachelor of Computer Science from the Islamic University of Madinah in December 2025.
- **Academic Performance**: Graduated with Second Class Honors and a high GPA of 4.57/5.0.
- **Core Coursework**: Artificial Intelligence, Machine Learning, Data Structures and Algorithms, Database Management Systems, Software Engineering, Web Development, Operating Systems, Computer Networks.
- **Research Interests**: Neural Engineering, Bio-signal Processing (EEG), Multi-Agent LLM Orchestration, and Arabic NLP.
- **Activities**: Active participant in university programming contests and tech hackathons, helping lead student developer focus groups.`,
        contentAr: `تخرج أسامة بدرجة البكالوريوس في علوم الحاسب من الجامعة الإسلامية بالمدينة المنورة في ديسمبر 2025.
- **الأداء الأكاديمي**: تخرج بمرتبة الشرف الثانية وبمعدل تراكمي مرتفع 4.57 من 5.0.
- **أبرز المواد المدروسة**: الذكاء الاصطناعي، تعلم الآلة، هياكل البيانات والخوارزميات، نظم إدارة قواعد البيانات، هندسة البرمجيات، تطوير الويب، نظم التشغيل، شبكات الحاسب.
- **الاهتمامات البحثية**: الهندسة العصبية، معالجة الإشارات الحيوية (EEG)، تنسيق أنظمة الوكلاء المتعددين اللغوية (LLM Orchestration)، ومعالجة اللغات الطبيعية للغة العربية.
- **الأنشطة الأكاديمية**: مشارك نشط في مسابقات البرمجة الجامعية والهاكاثونات التقنية، وساهم في قيادة مجموعات التركيز للطلاب المطورين.`,
        keywords: ["education", "university", "islamic university", "madinah", "gpa", "major", "bachelor", "degree", "course", "جامعة", "دراسة", "تعليم", "تخرج", "تخصص", "معدل", "الإسلامية", "المدينة", "بكالوريوس"]
    },
    {
        id: "graduation_project",
        titleEn: "Graduation Project: AI EEG Signal Converter",
        titleAr: "مشروع التخرج: نظام تحويل إشارات الدماغ بالذكاء الاصطناعي (EEG)",
        contentEn: `### Graduation Project: AI EEG Signal Converter (Jan 2025 – Dec 2025)
*   **Objective**: Convert human Electroencephalogram (EEG) brain activity directly into Arabic characters and words, enabling communication for individuals with severe speech and motor disabilities.
*   **Key Results**: Achieved **94% classification accuracy** on EEG signal-to-letter conversion using a custom-built model.
*   **Datasets Used**: Utilized public motor-imagery EEG datasets alongside custom-collected EEG samples using specialized brain-sensing hardware.
*   **Technical Pipeline**:
    1.  **Preprocessing**: Advanced signal filtering (removing artifacts, powerline noise via notch filters, and bandpass filtering between 0.5Hz - 50Hz), noise removal, normalization, and trial segmentation.
    2.  **Feature Extraction**: Extracted temporal, spectral (using Power Spectral Density - PSD), and spatial features (using Common Spatial Patterns - CSP).
    3.  **AI Classification**: Deployed a hybrid deep learning model combining Convolutional Neural Networks (CNNs) for spatial feature extraction and Recurrent Neural Networks (RNN/LSTM) for temporal dependencies.
*   **Impact & Future Scope**: Serves as a foundation for Brain-Computer Interfaces (BCIs) in the Arabic-speaking world, with potential applications in healthcare, assistive technology, and prosthetic control.`,
        contentAr: `### مشروع التخرج: نظام تحويل إشارات الدماغ بالذكاء الاصطناعي (EEG) (يناير 2025 – ديسمبر 2025)
*   **الهدف**: تحويل نشاط الدماغ الكهربائي (EEG) البشري مباشرة إلى حروف وكلمات عربية، لتسهيل التواصل للأفراد الذين يعانون من إعاقات حركية ونطقية شديدة.
*   **النتائج المحققة**: تم تحقيق **دقة تصنيف بلغت 94%** في تحويل إشارات الدماغ إلى حروف باستخدام نموذج مخصص.
*   **البيانات المستخدمة**: تم دمج قواعد بيانات EEG عامة مع عينات تم جمعها يدوياً باستخدام أجهزة استشعار الدماغ المتخصصة.
*   **مراحل الأنبوب التقني (Pipeline)**:
    1.  **المعالجة المسبقة**: تصفية الإشارات المتقدمة (إزالة التشويش والإشارات البيولوجية غير المرغوبة باستخدام مرشحات Notch وتصفية النطاق الترددي Bandpass بين 0.5 و50 هرتز)، والتقييس العادي وتجزئة الفترات التجريبية.
    2.  **استخراج الميزات**: استخراج الخصائص الزمنية والطيفية (باستخدام Power Spectral Density - PSD) والخصائص المكانية (باستخدام Common Spatial Patterns - CSP).
    3.  **التصنيف بالذكاء الاصطناعي**: تطوير نموذج هجين للتعلم العميق يدمج بين شبكات CNN لاستخراج الميزات المكانية وشبكات LSTM لمعالجة التسلسلات الزمنية.
*   **الأثر والتطبيقات المستقبلية**: يُعد نواة لتطبيقات واجهات الدماغ والحاسوب (BCI) في الوطن العربي، مما يمهد الطريق لتقنيات مساعدة متطورة في الرعاية الصحية والتحكم بالأطراف الصناعية.`,
        keywords: ["graduation", "project", "eeg", "brain", "signal", "classification", "accuracy", "bci", "filtering", "تخرج", "مشروع التخرج", "إشارات الدماغ", "إشارة", "دماغ", "تصنيف", "تصفية", "معالجة إشارات"]
    },
    {
        id: "projects_deep_dive",
        titleEn: "Technical Projects Deep Dive",
        titleAr: "تفاصيل المشاريع التقنية العميقة",
        contentEn: `Here are the detailed technical specifications of Osama's key projects:

### 1. Monjez: Multi-Agent AI Platform (Agenticthon 2026 - 1st Place)
*   **Problem**: Converting lengthy academic research papers and documents into concise, actionable summaries and formatted outputs manually is time-consuming.
*   **Solution**: A multi-agent AI system that divides the processing workflow among dedicated, autonomous agents.
*   **Technical Architecture**:
    *   **Planner Agent**: Analyzes the input document and defines the optimal summary structure and execution path.
    *   **Research Agent**: Performs deep semantic search and text extraction on the documents using Vector Databases and RAG.
    *   **Writer Agent**: Synthesizes the extracted findings into professional markdown formats.
    *   **Validator Agent**: Checks the generated output against the original source to eliminate hallucinations and ensure factual accuracy.
*   **Technologies**: Python, LangGraph, LangChain, Gemini API, RAG, ChromaDB (Vector Store), Markdown parser.
*   **Impact**: Automates academic document processing, cutting reading and synthesis time by over 80%.

### 2. Loan Recommendation Platform (Future Fintech Hackathon - 1st Place)
*   **Objective**: Develop a data-driven system to match small-to-medium enterprises (SMEs) and individuals with optimal loan options based on risk assessment.
*   **Technical Details**: Implemented machine learning classification algorithms (Random Forest and XGBoost) to assess creditworthiness from historical financial transactions and alternative data. Built a prototype financial analysis dashboard.
*   **Technologies**: Python, Pandas, Scikit-learn, XGBoost, Streamlit, Git.

### 3. AI Smart Vision System (Scai AI League Hackathon - Mubsir)
*   **Objective**: Assist visually impaired sports fans in following matches through real-time camera processing and synthesized audio commentary.
*   **Technical Pipeline**: OpenCV extracts frames from active video feeds; YOLO performs real-time detection of key sports items (ball, players, goals); NLP converts coordinates and events into narrative text, which is read aloud via Text-to-Speech (TTS).
*   **Technologies**: Python, OpenCV, YOLOv8, NLP, Text-to-Speech, PyTorch.

### 4. Airline Reservation Application
*   **Objective**: A desktop booking client with full relational schema support.
*   **Details**: Features multi-airline seat selections, dynamic schedule updates, and automated booking notifications. Uses SQL transactions to prevent double-booking.
*   **Technologies**: Java, JDBC, SQL, SQLite/MySQL, Java Swing UI.`,
        contentAr: `تفاصيل المواصفات الفنية لأبرز مشاريع أسامة الشكاكي:

### 1. منجز (Monjez): منصة الوكلاء المتعددين للذكاء الاصطناعي (هاكاثون أنجيكثون 2026 - المركز الأول)
*   **المشكلة**: استخلاص وتلخيص أوراق البحث الأكاديمية والوثائق الطويلة يدوياً يتطلب ساعات عمل طويلة.
*   **الحل**: نظام ذكاء اصطناعي وكيل (Agentic AI) يوزع عملية المعالجة على وكلاء مستقلين متخصصين.
*   **البنية البرمجية للوكلاء**:
    *   **وكيل التخطيط (Planner Agent)**: يحلل المستند ويضع الهيكل المثالي للمخرجات وخطوات التنفيذ.
    *   **وكيل البحث (Research Agent)**: ينفذ عمليات البحث الدلالي واستخراج النصوص العميقة باستخدام قواعد البيانات المتجهة وRAG.
    *   **وكيل الكتابة (Writer Agent)**: يصيغ النتائج المستخرجة في تقارير احترافية بصيغة Markdown.
    *   **وكيل التحقق (Validator Agent)**: يطابق التقرير مع المصدر الأصلي للتأكد من عدم وجود هلوسة وضمان الدقة الحقائقية بنسبة 100%.
*   **التقنيات**: Python، LangGraph، LangChain، Gemini API، RAG، ChromaDB، معالجة النصوص.

### 2. منصة توصية القروض الذكية (هاكاثون مستقبل الفينتك - المركز الأول)
*   **الهدف**: نظام معتمد على البيانات لمطابقة المنشآت الصغيرة والمتوسطة (SMEs) والأفراد مع خيارات القروض المثالية بناءً على تقييم المخاطر.
*   **التفاصيل الفنية**: تطبيق خوارزميات تعلم الآلة للتصنيف (Random Forest و XGBoost) لتقييم الجدارة الائتمانية من المعاملات التاريخية والبيانات البديلة، وربطها بلوحة تحكم تفاعلية للمؤشرات المالية.
*   **التقنيات**: Python، Pandas، Scikit-learn، XGBoost، Streamlit.

### 3. نظام الرؤية الذكية للذكاء الاصطناعي (مبصر - هاكاثون SCAI)
*   **الهدف**: مساعدة المكفوفين وضعاف البصر على متابعة مباريات كرة القدم والرياضات عبر تحليل مباشر وتوليد تعليق صوتي فوري يصف الأحداث.
*   **الأنبوب التقني**: معالجة إطارات الفيديو الحية باستخدام OpenCV، وتطبيق YOLO للكشف الفوري عن الكائنات (الكرة، اللاعبين، المرمى)، ثم استخدام معالجة اللغات الطبيعية (NLP) لصياغة أحداث المباراة وتوليد الصوت عبر قارئ النصوص (TTS).
*   **التقنيات**: Python، OpenCV، YOLOv8، PyTorch، معالجة اللغات الطبيعية.

### 4. نظام حجوزات الطيران المتكامل
*   **الهدف**: تطبيق سطح مكتب لإدارة وحجز تذاكر الطيران مع دعم كامل لقواعد البيانات العلائقية.
*   **التفاصيل الفنية**: يتميز بحجز المقاعد، وتحديث مواعيد الرحلات ديناميكياً، مع معالجة المعاملات المالية وقفل الحجوزات المتزامنة في قاعدة البيانات لمنع الحجز المزدوج.
*   **التقنيات**: Java، JDBC، SQL، SQLite/MySQL، Java Swing UI.`,
        keywords: ["project", "projects", "best project", "monjez", "loans", "mubsir", "smart vision", "airline", "yolo", "opencv", "langgraph", "agents", "architecture", "fintech", "منجز", "قروض", "مبصر", "رؤية ذكية", "طيران", "وكلاء", "بنية", "مشاريع", "مشروع"]
    },
    {
        id: "technical_knowledge",
        titleEn: "Technical Stack & Concepts",
        titleAr: "القدرات الفنية والتقنيات والمفاهيم",
        contentEn: `Osama possesses specialized technical expertise in:
- **AI & Machine Learning**: Supervised/Unsupervised Learning, Deep Neural Networks (CNNs, LSTMs, Transformers), Natural Language Processing (NLP), Large Language Models (LLMs), RAG (Retrieval-Augmented Generation), and Brain-Computer Interfaces (BCIs).
- **Agentic AI Frameworks**: LangChain, LangGraph (for stateful cyclic multi-agent orchestration), CrewAI, AutoGen, and vector stores (ChromaDB, Pinecone).
- **Development Languages**: Expert in Python (AI/Data), advanced in Java (Object-Oriented & SQL integration), and JavaScript/TypeScript (Next.js/React full-stack development).
- **Tools & DevOps**: Docker, Git/GitHub, Streamlit, SQL databases, Jupyter Notebooks.
- **RAG vs. Agentic AI**: He is skilled in building RAG applications (which retrieve static documents to augment LLM prompts) as well as Agentic AI systems (where multiple LLM agents act as planning and reasoning engines in loops to solve dynamic, multi-step tasks).`,
        contentAr: `يمتلك أسامة خبرة تقنية متخصصة ومتقدمة في:
- **الذكاء الاصطناعي وتعلم الآلة**: التعلم الخاضع للإشراف وغير الخاضع للإشراف، الشبكات العصبية العميقة (CNNs, LSTMs, Transformers)، معالجة اللغات الطبيعية (NLP)، النماذج اللغوية الضخمة (LLMs)، الـ RAG، وواجهات الدماغ والحاسوب (BCI).
- **إطارات عمل وكلاء الذكاء الاصطناعي**: LangChain، و LangGraph (لبناء وتنسيق أنظمة الوكلاء المتعددين ذات الحلقات المكررة وحفظ الحالات)، و CrewAI، وقواعد البيانات المتجهة (ChromaDB, Pinecone).
- **لغات البرمجة**: خبير في Python (الذكاء الاصطناعي وتحليل البيانات)، متقدم في Java (البرمجة كائنية التوجه وتكامل SQL)، و JavaScript/TypeScript (لتطوير الويب الكامل عبر Next.js/React).
- **الأدوات والمنصات**: Docker، و Git/GitHub، و Streamlit، وقواعد بيانات SQL، وبيئات Jupyter.
- **الفرق بين RAG و Agentic AI**: يستطيع أسامة بناء تطبيقات RAG (التي تسترجع المستندات الثابتة لتدعيم موجه LLM) بالإضافة إلى أنظمة وكلاء الذكاء الاصطناعي (حيث تعمل نماذج LLM المتعددة كمحركات للتخطيط واتخاذ القرار في حلقات مكررة لحل المشكلات المعقدة).`,
        keywords: ["tech", "languages", "python", "java", "langchain", "langgraph", "agents", "rag", "docker", "machine learning", "deep learning", "تقنيات", "بايثون", "جافا", "مهارات", "تعلم الآلة", "تعلم عميق", "ذكاء اصطناعي", "وكلاء"]
    },
    {
        id: "experience_deep_dive",
        titleEn: "Professional Experience Deep Dive",
        titleAr: "تفاصيل الخبرة المهنية العميقة",
        contentEn: `### IT Support Intern at Alfanar Company (Riyadh, Saudi Arabia | May 2025 – August 2025)
*   **Daily Responsibilities**: Managed active directory users, resolved technical software and hardware issues across corporate IT infrastructure, and assisted network administrators in monitoring local network performance.
*   **Key Troubleshooting Tasks**: Configured routing tables, set up local workstations, troubleshot secure network connectivity issues, managed server backups, and resolved operating system conflicts.
*   **Skills Acquired**: IT Infrastructure Management, Active Directory, Network Administration, Hardware Diagnostics, Operating Systems (Windows Server, Linux).`,
        contentAr: `### متدرب في الدعم الفني وتكنولوجيا المعلومات في شركة الفنار (الرياض، المملكة العربية السعودية | مايو 2025 – أغسطس 2025)
*   **المسؤوليات اليومية**: إدارة حسابات المستخدمين في Active Directory، حل المشكلات البرمجية والعتادية الفنية عبر البنية التحتية لتكنولوجيا المعلومات بالشركة، ومساعدة مسؤولي الشبكات في مراقبة وتحسين أداء الشبكة المحلية.
*   **أبرز مهام استكشاف الأخطاء**: تكوين جداول التوجيه وتثبيت محطات العمل المحلية، حل مشكلات الاتصال بالشبكة الآمنة، إدارة النسخ الاحتياطي للخوادم، وتصفية وحل تعارضات أنظمة التشغيل.
*   **المهارات المكتسبة**: إدارة البنية التحتية لتكنولوجيا المعلومات، Active Directory، إدارة الشبكات، تشخيص الأعطال العتادية، أنظمة التشغيل (Windows Server، Linux).`,
        keywords: ["experience", "job", "intern", "internship", "alfanar", "it support", "network", "riyadh", "خبرة", "عمل", "تدريب", "الفنار", "دعم فني", "شبكات", "الرياض", "تدريب تعاوني"]
    },
    {
        id: "achievements_awards",
        titleEn: "Achievements & Awards",
        titleAr: "الإنجازات والجوائز الكبرى",
        contentEn: `Osama has achieved several remarkable milestones:
- **1st Place at Agenticthon 2026**: Awarded first place out of dozens of competing teams for developing *Monjez*, an autonomous multi-agent research platform.
- **1st Place at Future Fintech Hackathon**: Awarded first place for designing a data-driven SME loan recommendation application in 48 hours.
- **Honours CS Degree**: Graduated in the top tier of his class at the Islamic University of Madinah with a cumulative GPA of 4.57/5.0 (Second Class Honors).
- **KAUST AI Program (Stage Three)**: Successfully completed the competitive advanced AI program sponsored by King Abdullah University of Science and Technology.
- **IBM RAG and Agentic AI Certification**: Validated advanced skills in deploying agentic architectures.`,
        contentAr: `حقق أسامة العديد من الإنجازات والجوائز المتميزة:
- **المركز الأول في هاكاثون أنجيكثون 2026 (Agenticthon)**: الفوز بالجائزة الكبرى من بين عشرات الفرق لتطوير منصة *منجز* للوكلاء المتعددين في الذكاء الاصطناعي.
- **المركز الأول في هاكاثون مستقبل الفينتك**: الفوز بالمركز الأول لتطوير وتصميم منصة توصيات القروض الذكية للشركات الصغيرة والمتوسطة خلال 48 ساعة فقط.
- **بكالوريوس علوم حاسب بمرتبة الشرف**: التخرج بمرتبة الشرف الثانية بمعدل تراكمي 4.57 من 5.0 من الجامعة الإسلامية بالمدينة المنورة.
- **برنامج كاوست للذكاء الاصطناعي (المرحلة الثالثة)**: اجتياز البرنامج المتقدم والطلائعي برعاية جامعة الملك عبد الله للعلوم والتقنية.
- **شهادة IBM في الـ RAG والذكاء الاصطناعي الوكيل**: شهادة تؤكد كفاءته في تطبيق هندسة الوكلاء البرمجية.`,
        keywords: ["awards", "first place", "win", "achievements", "hackathon", "certificates", "kaust", "جوائز", "المركز الأول", "فوز", "إنجازات", "هاكاثون", "شهادات", "كاوست", "أنجيكثون", "تخرج بمرتبة الشرف"]
    },
    {
        id: "hackathon_stories",
        titleEn: "Inside the Hackathons: Teamwork under Pressure",
        titleAr: "كواليس الهاكاثونات: العمل الجماعي تحت الضغط",
        contentEn: `### The Story of Monjez (Agenticthon 2026)
*   **The Challenge**: Building an AI project that utilizes multi-agent workflows to automate manual jobs.
*   **Osama's Strategy**: Recognizing that LLMs often hallucinate when handling long texts, Osama led his team to construct a divided workflow. Rather than a single prompt, they built 4 separate, cooperating agents (Planner, Researcher, Writer, Validator) in a loop using LangGraph. This architecture guaranteed factual accuracy, which wowed the judges and secured the **1st Place** award.

### The Story of Loan Recommendation (Fintech Hackathon)
*   **The Challenge**: Creating a functional financial technology solution in just 48 hours.
*   **Osama's Strategy**: Realizing that SMEs lack clear documentation, Osama designed a model that parses alternative data points (e.g. transactional volumes, invoices) alongside traditional logs. Working through the night, his team implemented the backend model in Python and wrapped it in a clean Streamlit interface. The judges awarded them **1st Place** due to its immediate business viability and technical readiness.`,
        contentAr: `### قصة نجاح مشروع منجز (هاكاثون أنجيكثون 2026)
*   **التحدي**: بناء مشروع ذكاء اصطناعي يعتمد بالكامل على تدفقات العمل القائمة على وكلاء متعددين لأتمتة المهام المعقدة.
*   **إستراتيجية أسامة**: إدراكاً منه أن النماذج اللغوية تسهل هلوساتها عند التعامل مع نصوص طويلة، قاد أسامة فريقه لبناء نظام مقسم المهام. بدلاً من موجه واحد، طوروا 4 وكلاء مستقلين متعاونين (المخطط، الباحث، الكاتب، المدقق) في حلقة مفرغة باستخدام LangGraph. ضمنت هذه البنية دقة تامة ومطابقة للمستندات الأصلية، مما أبهر لجنة التحكيم وتوجهم بالمركز الأول.

### قصة نجاح منصة القروض (هاكاثون مستقبل الفينتك)
*   **التحدي**: تطوير حل متكامل للتكنولوجيا المالية خلال 48 ساعة فقط تحت ضغط زمني كبير.
*   **إستراتيجية أسامة**: لمعالجة نقص المستندات الائتمانية الواضحة للمنشآت الصغيرة والمتوسطة، صمم أسامة نموذجاً يحلل نقاط بيانات بديلة (مثل حجم الفواتير والعمليات اليومية) بجانب الدفاتر التقليدية. عمل الفريق طوال الليل لتطبيق النموذج بلغة بايثون وربطه بواجهة Streamlit، وحصلوا على المركز الأول لقابليته للتطبيق التجاري المباشر وجاهزيته التقنية.`,
        keywords: ["stories", "agenticthon", "teamwork", "pressure", "strategy", "details", "monjez story", "قصص", "فريق", "عمل جماعي", "هاكاثونات", "إستراتيجية", "قصة منجز", "تفاصيل الفوز"]
    },
    {
        id: "personal_insights",
        titleEn: "Personal Insights & Personality Profile",
        titleAr: "رؤى شخصية وتحليل الشخصية المهنية",
        contentEn: `### Personality Profile
- **Personal Values**: Continuous Learning, Integrity, Innovation, Teamwork, Excellence, Impact-Driven Thinking.
- **Work Style**: Osama thrives when solving challenging, open-ended problems. He excels at learning new technologies rapidly, prefers practical hands-on building, and values ownership.
- **Motivation**: Driven by building AI products that solve real-world problems and contribute actively to Saudi Arabia's growing technology ecosystem under Vision 2030.
- **Future Goals**: To lead AI engineering teams, design enterprise-scale multi-agent architectures, and build successful AI-first startup products.
- **Hobbies**: Keeping up with AI research papers, participating in coding challenges, technology prototyping, and hiking.`,
        contentAr: `### تحليل الشخصية المهنية والرؤى الشخصية
- **القيم الشخصية**: التعلم المستمر، النزاهة، الابتكار، العمل الجماعي، التميز، والتفكير الموجه بالأثر والمنفعة العامة.
- **أسلوب العمل**: يزدهر أسامة عند حل المشكلات التقنية الصعبة والمفتوحة. متميز بالتعلم السريع للتقنيات الجديدة، ويفضل بناء المشاريع العملية بنفسه ويتحمل المسؤولية الكاملة للمهام.
- **الدوافع المهنية**: يدفعه الشغف لتطوير منتجات ذكاء اصطناعي حقيقية تسهم بشكل فعال في بناء المنظومة التقنية للمملكة العربية السعودية تماشياً مع رؤية 2030.
- **الأهداف المستقبلية**: قيادة فرق هندسة الذكاء الاصطناعي، تصميم معماريات الوكلاء المتعددين الضخمة للشركات، وتأسيس وبناء منتجات تقنية ذكية ناجحة.
- **الاهتمامات والهوايات**: قراءة الأوراق البحثية الحديثة في الذكاء الاصطناعي، خوض تحديات البرمجة، تطوير النماذج البرمجية السريعة، والمشي الطويل (الهايكنج).`,
        keywords: ["personality", "values", "goals", "motivation", "hobbies", "vision", "passion", "شخصية", "قيم", "شغف", "دوافع", "أهداف مستقبلية", "هوايات", "رؤية", "أسلوب عمل"]
    }
];

export const interviewLibrary: InterviewQA[] = [
    {
        id: "tell_me_about_yourself",
        questionEn: "Tell me about yourself",
        questionAr: "عرفني على نفسك / تحدث عن نفسك",
        answerEn: "I am Osama Shakaki, an AI Engineer and a Computer Science Honours graduate from the Islamic University of Madinah. My passion lies in building intelligent systems, specifically utilizing Multi-Agent architectures, RAG, and NLP. I have a proven track record of rapid innovation, having won 1st Place in both the Agenticthon 2026 (for my platform Monjez) and the Future Fintech Hackathon. I enjoy bridging the gap between state-of-the-art AI research and practical, scalable products.",
        answerAr: "أنا أسامة شققي، مهندس ذكاء اصطناعي وخريج علوم حاسب بمرتبة الشرف من الجامعة الإسلامية بالمدينة المنورة. يتركز شغفي في بناء الأنظمة الذكية، وتحديداً باستخدام معماريات الوكلاء المتعددين (Multi-Agent Systems)، وأنظمة استرجاع المعلومات (RAG)، ومعالجة اللغات الطبيعية (NLP). أمتلك مسيرة حافلة بالابتكار السريع، حيث فزت بالمركز الأول في كل من هاكاثون أنجيكثون 2026 (عن منصة منجز) وهاكاثون مستقبل الفينتك. أستمتع بردم الفجوة بين الأبحاث العلمية المتقدمة والمنتجات البرمجية القابلة للتوسع.",
        keywords: ["yourself", "introduce", "who are you", "bio", "osama", "نفسك", "تعريف", "من أنت", "سيرتك", "أسامة"]
    },
    {
        id: "why_should_we_hire_you",
        questionEn: "Why should we hire you?",
        questionAr: "لماذا يجب علينا توظيفك؟",
        answerEn: "You should hire me because I bring a unique combination of deep theoretical understanding of AI and a fast-paced, product-oriented development mindset. Having won two major hackathons, I have proven my ability to design architectures, solve complex problems, and deliver working software under tight constraints. I don't just write code; I design systems like multi-agent workflows that directly automate business operations and drive efficiency.",
        answerAr: "يجب عليكم توظيفي لأنني أجمع بين الفهم الأكاديمي العميق للذكاء الاصطناعي وبين عقلية التطوير السريعة الموجهة للمنتجات. من خلال فوزي بهاكاثونين رئيسيين، أثبتُّ قدرتي على تصميم معماريات الأنظمة، وحل المشكلات المعقدة، وتسليم برمجيات فعالة تحت ضغط الوقت والظروف. أنا لا أكتب كوداً فحسب؛ بل أصمم أنظمة ذكية مثل وكلاء العمل المؤتمتين لزيادة كفاءة العمليات مباشرة.",
        keywords: ["hire", "why you", "fit", "benefit", "value", "توظيفك", "نوظفك", "توظيف", "فائدة", "قيمة", "ماذا تقدم"]
    },
    {
        id: "strengths",
        questionEn: "What are your strengths?",
        questionAr: "ما هي نقاط قوتك؟",
        answerEn: "My greatest strengths are rapid adaptability to new technologies, architecture design (especially multi-agent AI and RAG pipelines), and technical problem-solving. I am highly comfortable leading teams, communicating complex technical concepts to non-technical stakeholders, and taking ownership of projects from concept to deployment.",
        answerAr: "أعظم نقاط قوتي هي القدرة السريعة على التكيف مع التقنيات الجديدة وتعلّمها، وتصميم معماريات الأنظمة (خاصة أنظمة RAG والوكلاء المتعددين)، وحل المشكلات المعقدة. كما أنني أشعر بارتياح كبير في قيادة الفرق البرمجية، وتبسيط المفاهيم الفنية المعقدة لأصحاب المصلحة غير التقنيين، وتحمل المسؤولية الكاملة للمشاريع من الفكرة إلى الإنتاج.",
        keywords: ["strengths", "good at", "skills", "advantages", "نقاط قوتك", "قوة", "تميز", "مميزات", "بماذا تتميز"]
    },
    {
        id: "weaknesses",
        questionEn: "What are your weaknesses?",
        questionAr: "ما هي نقاط ضعفك؟",
        answerEn: "I sometimes get overly focused on perfecting small details, such as optimizing code or refactoring architectures, which can absorb extra time. To manage this, I now apply strict time-boxing to my tasks, ensuring that I build a fully functional product first and only optimize during designated cycles.",
        answerAr: "في بعض الأحيان، أفرط في التركيز على تفاصيل صغيرة مثل تحسين كتابة الكود أو إعادة هيكلة المعماريات البرمجية، مما قد يستهلك وقتاً إضافياً. للتعامل مع هذا، بدأت في تطبيق سياسة جدولة زمنية صارمة (Time-boxing) للمهام، مما يضمن تسليم منتج يعمل بالكامل أولاً، ثم تخصيص فترات محددة لاحقاً للتحسين.",
        keywords: ["weaknesses", "fail", "improvement", "weak points", "نقاط ضعفك", "ضعف", "عيوب", "تحدي شخصي"]
    },
    {
        id: "challenge_faced",
        questionEn: "Describe a challenge you faced and how you handled it",
        questionAr: "حدثني عن تحدٍ واجهته وكيف تعاملت معه",
        answerEn: "During my graduation project (EEG signal converter), we faced severe noise issues that corrupted our raw neural data, dropping initial model classification accuracy below 50%. I researched biological signal filtering methods and implemented a combined Notch and Bandpass filter to isolate the exact motor-imagery frequency bands, followed by normalization. This preprocessing pipeline cleaned the signals effectively, bringing our final Deep Learning model classification accuracy up to 94%.",
        answerAr: "خلال مشروع تخرجي (محول إشارات الدماغ EEG)، واجهنا مشكلة ضوضاء شديدة أدت إلى تشويه البيانات العصبية الخام وهبوط دقة التصنيف الأولية إلى ما دون 50%. قمت بالبحث في طرق تصفية الإشارات البيولوجية وطبقت مرشح Notch و Bandpass لتصفية وعزل ترددات نشاط الدماغ الحركي تحديداً، متبوعاً بالتقييس. هذا الأنبوب نجح تماماً في تنظيف الإشارات ورفع الدقة النهائية لنموذج التعلم العميق إلى 94%.",
        keywords: ["challenge", "problem", "failure", "conflict", "solved", "تحدي", "مشكلة", "صعوبة", "تغلبت عليها", "حللتها"]
    },
    {
        id: "proud_project",
        questionEn: "Tell me about a project you are proud of",
        questionAr: "حدثني عن مشروع تفتخر به",
        answerEn: "I am extremely proud of Monjez, which won 1st Place at Agenticthon 2026. I designed its multi-agent layout using LangGraph to automate paper reading and synthesis. The hardest part was ensuring that the output reports were factually sound. By implementing a dedicated 'Validator Agent' that cross-checks all facts back to the original text via semantic search, we eliminated hallucinations. It proved that agentic AI can perform high-fidelity analytical work.",
        answerAr: "أنا فخور جداً بمشروع 'منجز' الذي فاز بالمركز الأول في أنجيكثون 2026. قمت بتصميم بنية الوكلاء المتعددين باستخدام LangGraph لأتمتة تلخيص الأبحاث العلمية. الجزء الأكثر صعوبة كان ضمان أن التقارير خالية من الأخطاء والهلوسة. وعبر تطوير وكيل مخصص للتحقق 'Validator Agent' لمطابقة الحقائق مع المصدر الأصلي، قضينا على الهلوسة تماماً، مما أثبت إمكانية استخدام الوكلاء للقيام بالتحليلات العميقة بدقة.",
        keywords: ["proud", "best project", "monjez", "accomplishment", "فخور", "مشروع فخور به", "أفضل إنجاز", "منجز", "أفضل مشاريعك"]
    },
    {
        id: "why_ai",
        questionEn: "Why did you choose AI?",
        questionAr: "لماذا اخترت مجال الذكاء الاصطناعي؟",
        answerEn: "I chose AI because it is the most transformative technology of our generation. Unlike static software, AI systems can adapt, reason, and solve non-deterministic problems. The ability to write algorithms that enable machines to process brain waves or autonomously conduct research represents a massive leap in human productivity, and I want to be at the forefront of building this future.",
        answerAr: "اخترت الذكاء الاصطناعي لأنه التقنية الأكثر تأثيراً وتغييراً في جيلنا الحالي. بخلاف البرمجيات التقليدية الثابتة، يمكن لأنظمة الذكاء الاصطناعي التكيف والتفكير وحل المشكلات غير المحددة مسبقاً. إن القدرة على كتابة خوارزميات تمكن الآلات من قراءة إشارات الدماغ أو إجراء الأبحاث بشكل مستقل تمثل قفزة هائلة في الإنتاجية البشرية، وأنا أريد أن أكون في الطليعة لبناء هذا المستقبل.",
        keywords: ["why ai", "passion ai", "artificial intelligence", "لماذا الذكاء", "سبب اختيارك", "حبك للذكاء", "شغف بالذكاء"]
    },
    {
        id: "five_years",
        questionEn: "Where do you see yourself in 5 years?",
        questionAr: "أين ترى نفسك بعد 5 سنوات؟",
        answerEn: "In five years, I see myself as a Senior AI Architect or Lead AI Engineer, leading engineering teams to build production-grade agentic platforms. I also aim to contribute to open-source agentic frameworks and help establish Saudi Arabia as a global hub for AI innovation, in line with Vision 2030.",
        answerAr: "بعد خمس سنوات، أرى نفسي كمهندس معماري أول للذكاء الاصطناعي (Senior AI Architect) أو قائد لفرق هندسة الذكاء الاصطناعي لتطوير منصات الوكلاء الضخمة. أطمح أيضاً للمساهمة الفعالة في إطارات العمل مفتوحة المصدر وتطوير منظومة الابتكار التقني في المملكة لتكون مركزاً عالمياً للذكاء الاصطناعي تماشياً مع رؤية 2030.",
        keywords: ["years", "future", "goals", "long term", "أين ترى نفسك", "مستقبلك", "بعد خمس سنوات", "أهدافك المستقبلية"]
    },
    {
        id: "work_under_pressure",
        questionEn: "How do you handle work pressure?",
        questionAr: "كيف تتعامل مع ضغوط العمل؟",
        answerEn: "I handle pressure by breaking down complex, overwhelming tasks into small, structured action items and prioritizing them. During hackathons, where time is extremely limited, I focus on building a robust Minimum Viable Product (MVP) first, keeping communication channels open with my team, and managing my energy levels to avoid burnout. Staying calm and structured is my key to success.",
        answerAr: "أتعامل مع الضغط من خلال تقسيم المهام المعقدة الكبيرة إلى خطوات صغيرة مرتبة وترتيب أولوياتها. خلال الهاكاثونات، حيث يكون الوقت محدوداً جداً، أركز على بناء نموذج أولي قوي وقابل للتشغيل أولاً (MVP)، مع الحفاظ على قنوات تواصل مفتوحة وواضحة مع الفريق، وإدارة طاقتي لمنع الإرهاق. الهدوء والتنظيم هما مفتاح نجاحي تحت الضغط.",
        keywords: ["pressure", "stress", "deadlines", "hackathons stress", "الضغط", "الضغوط", "ضغط العمل", "تتعامل مع الضغط", "تحت الضغط"]
    },
    {
        id: "learn_new_tech",
        questionEn: "How do you learn new technologies?",
        questionAr: "كيف تتعلم التقنيات الجديدة؟",
        answerEn: "I learn by building. I start by reading the official documentation to grasp the core concepts, then I immediately start building a small prototype to test the technology's capabilities. Building projects, running into errors, and debugging them is the fastest way I assimilate frameworks, such as when I quickly mastered LangGraph and CrewAI for my hackathons.",
        answerAr: "أتعلم عن طريق البناء والممارسة الفعلية. أبدأ بقراءة التوثيق الرسمي (Documentation) لاستيعاب المفاهيم الأساسية، ثم أنتقل فوراً لبناء نموذج أولي صغير لاختبار إمكانيات التقنية. مواجهة الأخطاء وحلها هي أسرع طريقة أتعلم بها إطارات العمل، مثلما فعلت عندما تعلمت LangGraph و CrewAI بسرعة من أجل الهاكاثونات.",
        keywords: ["learn", "technologies", "new framework", "learning style", "تعلم", "تتعلم", "تطوير مهاراتك", "تتعلم التقنيات"]
    },
    {
        id: "difference_langchain_langgraph",
        questionEn: "What is the difference between LangChain and LangGraph?",
        questionAr: "ما الفرق بين LangChain و LangGraph؟",
        answerEn: "LangChain is designed for building linear chains of LLM calls, such as sequential pipelines or basic RAG systems. LangGraph, built on top of LangChain, is designed for building stateful, multi-agent systems with loops and cycles. LangGraph allows agents to converse, backtrack, invoke tools, and maintain shared state dynamically, making it ideal for complex, non-linear reasoning agent tasks.",
        answerAr: "صُممت مكتبة LangChain لبناء تسلسلات خطية (Linear Chains) من استدعاءات النماذج اللغوية، مثل الأنابيب المتتالية أو أنظمة RAG البسيطة. بينما صُممت مكتبة LangGraph (المبنية فوق LangChain) لبناء أنظمة وكلاء متعددة تحتفظ بالحالة (Stateful) وتدعم الحلقات الدائرية والمكررة (Loops/Cycles). تتيح LangGraph للوكلاء التحاور، والتراجع عن القرارات، واستدعاء الأدوات، ومشاركة الذاكرة ديناميكياً، مما يجعلها مثالية للمهام المعقدة وغير الخطية.",
        keywords: ["langchain", "langgraph", "difference", "comparison", "agents tools", "لانجشين", "لانج جراف", "الفرق بين", "مقارنة", "وكلاء ذكاء"]
    },
    {
        id: "current_learning",
        questionEn: "What are you learning or developing right now?",
        questionAr: "ماذا تتعلم أسامة الآن وماذا يطور من نفسه؟",
        answerEn: "Right now, I am expanding my knowledge in advanced agentic design patterns, specifically focusing on multi-agent collaboration structures, optimizing agent memory states, and building scalable LLM routing systems. I am also researching how to improve BCI (Brain-Computer Interface) signal decoding using lightweight local transformers.",
        answerAr: "حالياً، أقوم بتوسيع معرفتي في أنماط تصميم الوكلاء المتقدمة (Advanced Agentic Design Patterns)، مع التركيز بشكل خاص على هياكل تعاون الوكلاء المتعددين، وتحسين حالات ذاكرة الوكلاء، وبناء أنظمة توجيه النماذج اللغوية الكبيرة القابلة للتوسع. كما أبحث في تحسين فك تشفير إشارات الدماغ (BCI) باستخدام نماذج الترانسفورمرز المحلية خفيفة الوزن.",
        keywords: ["studying", "learning now", "developing", "future stack", "تتعلم الان", "تطوير نفسك", "ماذا تطور", "تتعلم حاليا"]
    }
];
