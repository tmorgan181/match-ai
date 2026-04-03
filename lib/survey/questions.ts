export type ScaleQuestion = {
  type: "scale";
  id: string;
  text: string;
  lowLabel?: string;
  highLabel?: string;
};

export type YNSQuestion = {
  type: "yns";
  id: string;
  text: string;
};

export type ChoiceQuestion = {
  type: "choice";
  id: string;
  text: string;
  options: { value: string; label: string }[];
};

export type TextQuestion = {
  type: "text";
  id: string;
  text: string;
  placeholder?: string;
  hint?: string;
};

export type Question = ScaleQuestion | YNSQuestion | ChoiceQuestion | TextQuestion;

export type Step = {
  title: string;
  instruction: string;
  questions: Question[];
};

export const STEPS: Step[] = [
  {
    title: "Your stance",
    instruction: "Rate how much you agree or disagree with each statement from 1 to 5.",
    questions: [
      {
        type: "scale",
        id: "q3",
        text: "The benefits of AI outweigh the risks.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q4",
        text: "I am actively trying to learn more about AI right now.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q5",
        text: "I prefer to understand a problem deeply before taking action on it.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q6",
        text: "I am genuinely excited about AI's potential.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q7",
        text: "We cannot afford to slow down AI development, even if there are serious risks.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q31",
        text: "I worry most about how AI affects vulnerable people in everyday life.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q32",
        text: "I am still early in forming my view on AI.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
    ],
  },
  {
    title: "More signals",
    instruction: "A few more opinion questions that help separate different AI outlooks.",
    questions: [
      {
        type: "scale",
        id: "q8",
        text: "Most AI capabilities are overhyped and will not deliver on their promises.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q9",
        text: "There is something important about human creativity that AI can never replicate.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q10",
        text: "I would push a button to uninvent AI if I could.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q11",
        text: "AI is already causing serious harm in everyday life.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q12",
        text: "I believe AI poses an existential risk to humanity.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
    ],
  },
  {
    title: "What you know",
    instruction: "A few more questions about instinct, evidence, technical background, and what kind of harms feel most real to you.",
    questions: [
      {
        type: "scale",
        id: "q13",
        text: "When AI causes harm, my first instinct is to change the rules and incentives behind it.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q14",
        text: "I regularly read papers, research, or technical writing about AI.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q15",
        text: "AI alignment research",
        lowLabel: "Not familiar",
        highLabel: "Very familiar",
      },
      {
        type: "scale",
        id: "q16",
        text: "AI makes people dumber.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q29",
        text: "I have built, modified, or meaningfully experimented with AI systems myself.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q30",
        text: "I am more interested in evaluating AI systems than building them.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q33",
        text: "The environmental cost of AI is one of my biggest concerns.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q34",
        text: "A major AI risk is that it reinforces bias and discrimination at scale.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q35",
        text: "AI is making surveillance and loss of privacy feel normal.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
    ],
  },
  {
    title: "Your experience",
    instruction: "Answer yes, sometimes, or no for each question.",
    questions: [
      { type: "yns", id: "q17", text: "Do you use AI tools regularly in your daily life?" },
      { type: "yns", id: "q18", text: "When I see an AI-related problem, is my first instinct to build or improve a system?" },
      { type: "yns", id: "q19", text: "Have you or someone you care about been harmed by AI systems or AI-generated content?" },
      { type: "yns", id: "q20", text: "Have you lost opportunities, income, or creative confidence because of AI?" },
      { type: "yns", id: "q21", text: "Even if AI became safer and more useful, would you still oppose some forms of it on principle?" },
      { type: "yns", id: "q22", text: "Have you used AI to generate art, images, writing, or music?" },
      { type: "yns", id: "q23", text: "Do you often feel influenced by AI algorithms or AI-generated content?" },
    ],
  },
  {
    title: "Big picture",
    instruction: "Choose the option that fits best, even if none are perfect.",
    questions: [
      {
        type: "choice",
        id: "q24",
        text: "What kind of signal moves you most in AI discussions?",
        options: [
          { value: "direct_harm", label: "Direct reports of harm in people's lives" },
          { value: "research", label: "Research, papers, and technical evidence" },
          { value: "useful_tools", label: "Useful tools working in practice" },
          { value: "human_values", label: "Arguments about human dignity and boundaries" },
          { value: "economic_harm", label: "Economic disruption and labor impacts" },
          { value: "catastrophic_risk", label: "Warnings about loss of control and catastrophic risk" },
          { value: "policy_leverage", label: "Policy and institutional leverage" },
        ],
      },
      {
        type: "choice",
        id: "q25",
        text: "What is your primary concern about AI?",
        options: [
          { value: "mental_health", label: "Mental health and emotional harm" },
          { value: "environment", label: "Environmental and social costs" },
          { value: "job_displacement", label: "Job displacement and labor impacts" },
          { value: "misinformation", label: "Misinformation and manipulation" },
          { value: "privacy", label: "Privacy and surveillance" },
          { value: "creativity_loss", label: "Loss of human creativity" },
          { value: "existential", label: "Existential or catastrophic risk" },
          { value: "not_concerned", label: "I am not especially concerned" },
        ],
      },
      {
        type: "choice",
        id: "q26",
        text: "Who should be primarily responsible for governing AI?",
        options: [
          { value: "government", label: "Governments" },
          { value: "companies", label: "Tech companies" },
          { value: "international", label: "International bodies" },
          { value: "open_source", label: "Open-source communities" },
          { value: "no_one", label: "No one should control it" },
        ],
      },
      {
        type: "choice",
        id: "q27",
        text: "When AI issues come up, which response feels most natural to you?",
        options: [
          { value: "learn_more", label: "I want to understand it better before taking a strong position" },
          { value: "build_better", label: "I want better tools and systems" },
          { value: "set_guardrails", label: "I want stronger rules and safeguards" },
          { value: "push_back", label: "I want to limit or push back on its expansion" },
          { value: "take_xrisk_seriously", label: "I want people to take long-term risk more seriously" },
        ],
      },
      {
        type: "choice",
        id: "q28",
        text: "How much technical knowledge do you have about how AI works?",
        options: [
          { value: "expert", label: "Expert" },
          { value: "advanced", label: "Advanced" },
          { value: "intermediate", label: "Intermediate" },
          { value: "basic", label: "Basic" },
          { value: "very_little", label: "Very little" },
        ],
      },
    ],
  },
  {
    title: "Your words",
    instruction: "Two quick open-ended prompts to end on. Write whatever comes to mind — there are no right answers.",
    questions: [
      {
        type: "text",
        id: "q1",
        text: 'What is the first word that comes to mind when you hear "AI"?',
        placeholder: "One word or short phrase",
      },
      {
        type: "text",
        id: "q2",
        text: "What do you most want to build, change, protect, or understand about AI?",
        placeholder: "1-2 sentences",
        hint: "Instinct is better than polish here.",
      },
    ],
  },
  {
    title: "Almost done",
    instruction: "Last step. Stay anonymous if you want, or leave your details for future updates.",
    questions: [],
  },
];
