
import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { HustleIdea, PersonaContent, HustleGuide, FinancialRule } from '../types';
import { generateMoreHustles, generateMoreGuides, generateMoreFinancialRules } from '../services/geminiService';
import { Layers, BookOpen, GraduationCap, Plus, Loader2, ArrowUpRight } from 'lucide-react';

interface HustleHubProps {
  persona: PersonaContent;
}

const initialHustles: HustleIdea[] = [
  { id: '1', title: 'Niche Newsletter', description: 'Curate high-value content for a specific industry (e.g., AI for Lawyers). Monetize via subscriptions.', difficulty: 'Medium', potential: '$2k - $10k/mo', tags: ['Content', 'Recurring'], riskLevel: 'Low', timeToRevenue: '3-6 Months', content: `### Step 1: **Niche Selection**
- **Identify Expertise & Passion:** Choose a topic you are knowledgeable and passionate about.
- **Verify Market:** Ensure there is an audience willing to pay for premium content in this niche. Check existing communities like Reddit or paid newsletters.
### Step 2: **Platform & Stack**
- **Newsletter Platform:** Choose a platform like Substack, Beehiiv, or Ghost.
- **Content Creation:** Use tools like Notion for organization and Grammarly for proofreading.
### Step 3: **Growth & Monetization**
- **Free Content:** Offer high-quality free content to build an audience and trust.
- **Premium Tier:** Launch a paid tier with exclusive deep-dives, community access, or early access. Promote it to your free subscribers.` },
  { id: '2', title: 'SaaS Micro-Tools', description: 'Build small, single-purpose tools (e.g., PDF compressor) and charge a small monthly fee.', difficulty: 'Hard', potential: '$5k+/mo', tags: ['Code', 'Scale'], riskLevel: 'Medium', timeToRevenue: '1-3 Months', content: `### Step 1: **Identify a Pain Point**
- **Observe Inefficiencies:** Look for repetitive, manual tasks that people perform online.
- **"Scratch Your Own Itch":** Build a tool that solves a problem you personally have.
### Step 2: **Build an MVP (Minimum Viable Product)**
- **Core Functionality:** Focus only on the single, most important feature. The tool must do one thing perfectly.
- **No-Code/Low-Code:** Consider using tools like Bubble or Retool to build the MVP quickly and validate the idea.
### Step 3: **Launch & Iterate**
- **Targeted Launch:** Post your tool on platforms like Product Hunt, Indie Hackers, and relevant subreddits.
- **Collect Feedback:** Listen to your first users. Iterate on the product based on their feedback to achieve product-market fit. Charge from day one.` },
  { id: '3', title: 'High-Ticket Sales', description: 'Close calls for influencers or agencies. Commission based only. High skill ceiling.', difficulty: 'Medium', potential: '$10k+/mo', tags: ['Sales', 'Service'], riskLevel: 'Low', timeToRevenue: '1 Month', content: `### Step 1: **Master the Skill**
- **Learn from the Best:** Study sales frameworks from experts like Jordan Belfort (Straight Line) or Chris Voss (Negotiation).
- **Practice:** Role-play sales calls with friends. Record yourself and analyze your performance.
### Step 2: **Find a High-Ticket Offer**
- **Network:** Connect with online coaches, consultants, or marketing agencies that sell high-priced services ($3,000+).
- **Value Proposition:** Offer to work on a commission-only basis to remove the risk for them.
### Step 3: **Execute and Close**
- **Qualify Leads:** Ensure you are only speaking with potential clients who are a good fit for the offer.
- **Focus on the Problem:** A sales call is a consultation. Dig deep into the client's pain points and position the offer as the solution.` },
];

const initialGuides: HustleGuide[] = [
  { 
    id: 'g1', 
    title: 'Freelancing 101', 
    description: 'Launch your freelance career from scratch. Find your niche, price your services, and land your first high-paying client.', 
    readTime: '12 Min Read', 
    category: 'Starter',
    content: `### Step 1: **Define Your High-Value Skill**
- **Identify:** What are you exceptional at? (e.g., Writing, Coding, Design, Marketing)
- **Niche Down:** Don't be a generalist. Specialize in a profitable area (e.g., "Email marketing for SaaS companies").
### Step 2: **Forge Your Arsenal**
- **Portfolio:** Create 3-5 high-quality samples of your best work. If you have no clients, create spec work.
- **Pricing:** Calculate your hourly rate based on desired income and billable hours. Offer project-based packages for higher perceived value. Never underprice.
### Step 3: **The Hunt**
- **Outreach:** Identify 50 potential clients on platforms like LinkedIn, Twitter, or industry job boards.
- **Personalized Pitch:** Send personalized emails or DMs. Reference their work, identify a problem you can solve, and provide a clear call to action.
### Step 4: **Secure & Execute**
- **Contract:** Always use a simple contract outlining scope, timeline, and payment terms.
- **Over-deliver:** Exceed expectations on the first project to secure testimonials and repeat business. This is non-negotiable.`
  },
  { 
    id: 'g2', 
    title: 'The Part-Time Playbook', 
    description: 'Strategies for landing a high-impact part-time role that complements your primary income stream.', 
    readTime: '8 Min Read', 
    category: 'Growth',
    content: `### Step 1: **Identify Your Goal**
- **Income or Skill?** Decide if the primary goal is supplemental income or acquiring a new skill. This dictates the roles you target.
- **Time Commitment:** Realistically define how many hours you can commit per week.
### Step 2: **Leverage Your Core Competency**
- **Adjacent Roles:** Look for part-time roles that utilize your primary professional skills in a different context (e.g., a full-time software engineer doing part-time technical writing).
- **Consulting:** Package your expertise into a part-time consulting offer for smaller businesses that can't afford a full-time employee.
### Step 3: **Optimize Your Profile**
- **LinkedIn:** Create a clear headline stating your availability for part-time/consulting work in your specific niche.
- **Resume:** Create a separate, concise resume tailored for part-time opportunities, highlighting relevant skills and flexibility.`
  },
  { 
    id: 'g3', 
    title: 'Digital Product Factory', 
    description: 'A system for turning your knowledge into profitable digital products like ebooks, templates, and courses.', 
    readTime: '15 Min Read', 
    category: 'Digital',
    content: `### Step 1: **Find a Pain Point**
- **Your Expertise:** What problem have you solved for yourself or others that people would pay to solve faster?
- **Audience Research:** Browse forums like Reddit or Quora in your niche. What questions are asked repeatedly?
### Step 2: **Create the Minimum Viable Product (MVP)**
- **Template/Checklist:** The easiest start. A simple Notion template or a detailed checklist can be immensely valuable.
- **Ebook:** Write a short, high-impact ebook (30-50 pages) solving one specific problem.
### Step 3: **Build a Simple Sales Funnel**
- **Landing Page:** Use a tool like Gumroad or Carrd to create a simple page to sell your product.
- **Distribution:** Share your product on relevant social media platforms, forums, and to your email list (if you have one). Focus on value, not just selling.`
  },
];

const initialFinancialRules: FinancialRule[] = [
    { id: 'f1', title: 'The 50/30/20 Rule', description: 'Allocate 50% of income to Needs, 30% to Wants, and 20% to Savings & Debt Repayment. A simple foundation for financial discipline.', category: 'Saving', content: `**The 50/30/20 rule is a foundational budgeting framework.** It provides clarity and removes decision fatigue from your financial life.
### **50% for Needs:** This category covers your absolute essentials for survival and work. This includes housing, utilities, groceries, transportation, and insurance. The goal is to keep your core lifestyle lean.
### **30% for Wants:** This is for lifestyle choices that are not essential. It includes dining out, hobbies, subscriptions, and travel. This category is the first to be cut during a financial crunch.
### **20% for Financial Goals:** This is non-negotiable. This portion goes directly to your future self. It includes paying off high-interest debt (like credit cards), building your emergency fund, and investing for retirement.`
    },
    { id: 'f2', title: 'Build a 6-Month Emergency Fund', description: 'Before aggressive investing, secure 6 months of living expenses in a high-yield savings account. This is your shield against chaos.', category: 'Saving', content: `**Your emergency fund is not an investment; it is insurance.** It protects your actual investments from being sold at the worst possible time during a crisis.
### **Calculate Your Number:** Sum up your total monthly "Needs" (rent, food, utilities, etc.). Multiply this by six. This is your target number.
### **Where to Keep It:** It must be liquid and accessible. A high-yield savings account is the ideal place. It should not be in the stock market or tied up in illiquid assets.
### **When to Use It:** This fund is ONLY for true emergencies: job loss, unexpected medical bills, or urgent home repairs. It is not for a vacation or a new gadget.`
    },
    { id: 'f3', title: 'The Power of Compound Interest', description: 'Understand that consistent, early investment is more powerful than large, late investments. Make time your greatest financial ally.', category: 'Investing', content: `**Compound interest is the eighth wonder of the world.** Those who understand it, earn it. Those who don't, pay it.
### **The Concept:** It's the process of earning returns on your initial investment *and* on the accumulated interest from previous periods. Your money starts working for you.
### **Time is Your Greatest Asset:** Someone who invests $100 a month from age 25 will have significantly more money at age 65 than someone who invests $500 a month starting at age 45. The early, consistent investor wins due to the power of compounding over decades.
### **How to Apply It:** Start investing now, even if it's a small amount, in low-cost index funds (like VTI or VOO). Be consistent and patient.`
    },
    { id: 'f4', title: 'Pay Yourself First', description: 'Automate transfers to your investment and savings accounts the day you get paid. Your future self is your most important creditor.', category: 'Mindset', content: `**"Paying yourself first" is a mindset shift from saving what's left over to spending what's left after saving.**
### **The System:** Set up an automated, recurring transfer from your checking account to your savings and investment accounts. This transfer should execute the same day you receive your paycheck.
### **Remove Emotion:** Automation removes willpower from the equation. The money for your future is moved before you even have the chance to spend it on discretionary items.
### **The Result:** This simple habit guarantees you are always making progress on your financial goals, regardless of your spending habits for the rest of the month.` },
];

// Component to render content with robust Markdown-like parsing
const MarkdownContentRenderer = ({ content }: { content: string }) => {
  // Split content into sections by the "###" delimiter used by the AI
  const sections = content.trim().split('###').filter(section => section.trim() !== '');

  return (
    <div className="space-y-8 text-zinc-200 leading-relaxed">
      {sections.map((section, index) => {
        let currentSection = section.trim();
        
        let stepPrefix = '';
        const stepMatch = currentSection.match(/^(Step \d+: ?)/i);
        if (stepMatch) {
          stepPrefix = stepMatch[0];
          currentSection = currentSection.substring(stepPrefix.length);
        }

        let title = '';
        const titleMatch = currentSection.match(/^\*\*(.*?)\*\*/);
        if (titleMatch) {
          title = titleMatch[1];
          currentSection = currentSection.substring(titleMatch[0].length);
        }
        
        const body = currentSection.trim().split('\n').map((line, lineIndex) => {
          if (line.startsWith('- ')) {
            return (
              <div key={lineIndex} className="flex items-start gap-3 pl-2 mt-2">
                <span className="text-forge-red mt-1">&#9679;</span>
                <p className="flex-1">{line.substring(2)}</p>
              </div>
            );
          }
          return <span key={lineIndex}>{line}<br/></span>;
        });

        return (
          <div key={index}>
            {(stepPrefix || title) && (
              <h3 className="text-2xl font-bold text-forge-red font-header mb-3">
                {stepPrefix}{title}
              </h3>
            )}
            {body && <div className="text-zinc-300">{body}</div>}
          </div>
        );
      })}
    </div>
  );
};


export const HustleHub: React.FC<HustleHubProps> = ({ persona }) => {
  const [activeTab, setActiveTab] = useState<'streams' | 'guides' | 'iq'>('streams');
  const [hustleList, setHustleList] = useState<HustleIdea[]>([]);
  const [guidesList, setGuidesList] = useState<HustleGuide[]>([]);
  const [financialRulesList, setFinancialRulesList] = useState<FinancialRule[]>([]);
  const [loadingHustles, setLoadingHustles] = useState(false);
  const [loadingGuides, setLoadingGuides] = useState(false);
  const [loadingFinancialRules, setLoadingFinancialRules] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HustleGuide | HustleIdea | FinancialRule | null>(null);

  useEffect(() => {
    // Sort initial content based on persona
    setHustleList([...initialHustles].sort((a, b) => (b.tags.some(tag => persona.hustleFilterTags.includes(tag)) ? 1 : 0) - (a.tags.some(tag => persona.hustleFilterTags.includes(tag)) ? 1 : 0)));
    setGuidesList([...initialGuides].sort((a,b) => (persona.guideFocus.includes(b.category) ? 1 : 0) - (persona.guideFocus.includes(a.category) ? 1 : 0)));
    setFinancialRulesList([...initialFinancialRules].sort((a,b) => (persona.financialFocus.includes(b.category) ? 1 : 0) - (persona.financialFocus.includes(a.category) ? 1 : 0)));
  }, [persona]);


  const handleLoadMoreHustles = async () => {
    setLoadingHustles(true);
    try {
      const newHustles = await generateMoreHustles(persona);
      setHustleList(prev => [...prev, ...newHustles]);
    } catch (err) { console.error(err); } 
    finally { setLoadingHustles(false); }
  };

  const handleLoadMoreGuides = async () => {
    setLoadingGuides(true);
    try {
      const newGuides = await generateMoreGuides(persona);
      setGuidesList(prev => [...prev, ...newGuides]);
    } catch (err) { console.error(err); } 
    finally { setLoadingGuides(false); }
  };
  
  const handleLoadMoreFinancialRules = async () => {
    setLoadingFinancialRules(true);
    try {
      const newRules = await generateMoreFinancialRules(persona);
      setFinancialRulesList(prev => [...prev, ...newRules]);
    } catch (err) { console.error(err); } 
    finally { setLoadingFinancialRules(false); }
  };

  const LoadMoreButton = ({ isLoading, onClick, label }: { isLoading: boolean; onClick: () => void; label: string }) => (
    <div className="md:col-span-2 lg:col-span-3 flex items-center justify-center py-4">
      <button 
        onClick={onClick} 
        disabled={isLoading}
        className="group flex items-center justify-center gap-2 h-8 px-3 rounded border border-dashed border-zinc-800 bg-transparent hover:border-zinc-700 transition-all text-zinc-600 hover:text-zinc-400 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <Plus size={10} className="group-hover:scale-125 transition-transform" />
        )}
        <span className="font-bold text-[10px] uppercase tracking-wider font-header">{label}</span>
      </button>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-6">
         <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-header uppercase tracking-tight">Wealth Arsenal</h1>
            <p className="text-gray-400 font-medium text-sm md:text-base">Curated opportunities for <span className="text-forge-red font-bold">{persona.type}</span>.</p>
         </div>
         
         <div className="w-full md:w-auto pb-2 md:pb-0">
           <div className="w-full grid grid-cols-3 bg-zinc-950 p-1 rounded-md border border-zinc-800">
              {[
                  { id: 'streams', label: 'Income Streams', icon: Layers },
                  { id: 'guides', label: 'Blueprints', icon: BookOpen },
                  { id: 'iq', label: 'Financial IQ', icon: GraduationCap },
              ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center justify-center gap-2 px-1 py-2 rounded-sm text-[10px] sm:text-xs md:text-sm font-bold font-header uppercase tracking-wide transition-all w-full ${
                      activeTab === tab.id ? 'bg-forge-red text-white shadow-md' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                      <tab.icon size={14} className="flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                  </button>
              ))}
           </div>
         </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {activeTab === 'streams' && hustleList.map((hustle) => (
            <Card key={hustle.id} className="group flex flex-col">
               <div className="flex justify-between items-start mb-6">
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-forge-red">
                    <Layers size={20} />
                  </div>
                  <span className={`px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
                      hustle.difficulty === 'Easy' ? 'bg-green-900/20 text-green-500' :
                      hustle.difficulty === 'Medium' ? 'bg-yellow-900/20 text-yellow-500' :
                      'bg-red-900/20 text-red-500'
                  }`}>
                     {hustle.difficulty}
                  </span>
               </div>

               <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 font-header uppercase tracking-wide">{hustle.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6 border-l-2 border-zinc-800 pl-4">
                      {hustle.description}
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50 mb-6">
                  <div>
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Potential</span>
                     <div className="text-white font-bold font-mono text-sm">{hustle.potential}</div>
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block mb-1">Timeline</span>
                     <div className="text-white font-bold font-mono text-sm">{hustle.timeToRevenue}</div>
                  </div>
               </div>
               <Button onClick={() => setSelectedItem(hustle)} variant="secondary" className="w-full group-hover:border-forge-red group-hover:text-white">
                  Read Plan <ArrowUpRight size={16} />
               </Button>
            </Card>
         ))}

         {activeTab === 'guides' && guidesList.map((guide) => (
            <Card key={guide.id} className="group flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-forge-red">
                  <BookOpen size={20} />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase font-header tracking-widest">{guide.readTime}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3 font-header uppercase tracking-wide">{guide.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {guide.description}
                </p>
              </div>
              <Button onClick={() => setSelectedItem(guide)} variant="secondary" className="mt-6 w-full group-hover:border-forge-red group-hover:text-white">
                Read Blueprint <ArrowUpRight size={16} />
              </Button>
            </Card>
         ))}

         {activeTab === 'iq' && financialRulesList.map((rule) => (
            <Card key={rule.id} onClick={() => setSelectedItem(rule)} className="group hover:bg-zinc-850">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-forge-red">
                  <GraduationCap size={20} />
                </div>
                <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-sm">{rule.category}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-header uppercase tracking-wide">{rule.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {rule.description}
              </p>
            </Card>
         ))}

         {/* Load More Buttons */}
         {activeTab === 'streams' && <LoadMoreButton isLoading={loadingHustles} onClick={handleLoadMoreHustles} label="Load More Streams" />}
         {activeTab === 'guides' && <LoadMoreButton isLoading={loadingGuides} onClick={handleLoadMoreGuides} label="Load More Blueprints" />}
         {activeTab === 'iq' && <LoadMoreButton isLoading={loadingFinancialRules} onClick={handleLoadMoreFinancialRules} label="Load More Principles" />}
      </div>
      
      <Modal 
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title || 'Details'}
      >
        {selectedItem && <MarkdownContentRenderer content={selectedItem.content} />}
      </Modal>
    </div>
  );
};
