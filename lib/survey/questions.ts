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
    title: "To start",
    instruction: "Two short open-ended questions to warm up. Type whatever comes to mind — there are no right answers. You can clear your response at any time using the Clear button.",
    questions: [
      {
        type: "text",
        id: "q1",
        text: 'What is the first word that comes to mind when you hear "AI"?',
        placeholder: "One word",
      },
      {
        type: "text",
        id: "q2",
        text: "What do you want to build or change about AI?",
        placeholder: "1–2 sentences",
        hint: "There are no wrong answers — we're looking for your instinct, not a polished answer.",
      },
    ],
  },
  {
    title: "Your views",
    instruction: "Rate how much you agree or disagree with each statement on a scale of 1 to 5. There are no right or wrong answers — go with your gut. You can clear any answer using the Clear button.",
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
        text: "Human creativity is inherently more valuable than AI-generated content.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q5",
        text: "I am concerned about the environmental impacts of AI datacenters.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q6",
        text: "AI chatbots can provide meaningful emotional support.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q7",
        text: "I always want to know the truth, even if it means I was wrong.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q8",
        text: "AI is making humanity dumber.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
    ],
  },
  {
    title: "More views",
    instruction: "More agree/disagree statements. Same scale, same idea — 1 is strongly disagree, 5 is strongly agree. Skip or clear anything you'd rather not answer.",
    questions: [
      {
        type: "scale",
        id: "q9",
        text: "AI will become conscious before the year 2100.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q10",
        text: "Traditional education is better than AI-assisted learning.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q11",
        text: "AI should be regulated more strictly than it currently is.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q12",
        text: "AI-generated content should be clearly labeled.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q13",
        text: "The current pace of AI development is too fast.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
      {
        type: "scale",
        id: "q14",
        text: "AI music is legitimate art.",
        lowLabel: "Strongly disagree",
        highLabel: "Strongly agree",
      },
    ],
  },
  {
    title: "What you know",
    instruction: "Rate your familiarity with each area on a scale of 1 (not familiar at all) to 5 (very familiar). You can clear any answer using the Clear button.",
    questions: [
      {
        type: "scale",
        id: "q15",
        text: "How familiar are you with the suicide of Sewell Setzer III?",
        lowLabel: "Never heard of it",
        highLabel: "Know it well",
      },
      {
        type: "scale",
        id: "q16",
        text: "How familiar are you with social media recommendation algorithms?",
        lowLabel: "Not familiar",
        highLabel: "Very familiar",
      },
      {
        type: "scale",
        id: "q17",
        text: 'How familiar are you with the concept of "AI slop" — low-quality AI content flooding the internet?',
        lowLabel: "Not familiar",
        highLabel: "Very familiar",
      },
      {
        type: "scale",
        id: "q18",
        text: "How familiar are you with the EU AI Act?",
        lowLabel: "Not familiar",
        highLabel: "Very familiar",
      },
      {
        type: "scale",
        id: "q19",
        text: "How familiar are you with AI alignment research?",
        lowLabel: "Not familiar",
        highLabel: "Very familiar",
      },
    ],
  },
  {
    title: "Your life",
    instruction: "Answer yes, sometimes, or no for each question. You can clear any answer using the Clear button.",
    questions: [
      { type: "yns", id: "q20", text: "Do you use AI chatbots?" },
      { type: "yns", id: "q21", text: "Do you regularly vote in municipal and state elections?" },
      {
        type: "yns",
        id: "q22",
        text: "Have you or someone you know experienced harm from AI chatbot interactions?",
      },
      {
        type: "yns",
        id: "q23",
        text: "Could you write pseudocode or code to implement a recursive function (like Fibonacci)?",
      },
      { type: "yns", id: "q24", text: "Does your job involve writing emails or communication?" },
      {
        type: "yns",
        id: "q25",
        text: "Do you or have you ever occupied a seat on any political committee?",
      },
      { type: "yns", id: "q26", text: "Do you handle legal documents or regulatory material?" },
      {
        type: "yns",
        id: "q27",
        text: "Are you involved in construction, engineering, or computer science?",
      },
      {
        type: "yns",
        id: "q28",
        text: "Do you have children or other individuals for whom you are a guardian?",
      },
    ],
  },
  {
    title: "Your involvement",
    instruction: "A mix of yes/no/sometimes and multiple choice questions about your engagement with AI. Select the option that fits best — you can clear any answer using the Clear button.",
    questions: [
      {
        type: "yns",
        id: "q29",
        text: "Have you reported AI-generated misinformation or bot accounts online?",
      },
      { type: "yns", id: "q30", text: "Do you moderate or administer an online community?" },
      { type: "yns", id: "q31", text: "Do you create art, music, or other creative work?" },
      { type: "yns", id: "q32", text: "Have you used AI to generate images or art?" },
      {
        type: "choice",
        id: "q33",
        text: "When was the last time you talked to someone about your mental health?",
        options: [
          { value: "week", label: "Within the past week" },
          { value: "month", label: "Within the past month" },
          { value: "year", label: "Within the past year" },
          { value: "over_year", label: "More than a year ago" },
          { value: "never", label: "Never / Prefer not to say" },
        ],
      },
      {
        type: "choice",
        id: "q34",
        text: "What is your primary concern about AI? (pick one)",
        options: [
          { value: "mental_health", label: "Mental health impacts" },
          { value: "environment", label: "Environmental costs" },
          { value: "job_displacement", label: "Job displacement" },
          { value: "misinformation", label: "Misinformation and manipulation" },
          { value: "privacy", label: "Privacy and surveillance" },
          { value: "creativity_loss", label: "Loss of human creativity" },
          { value: "existential_risk", label: "Existential / safety risk" },
          { value: "not_concerned", label: "I'm not particularly concerned" },
        ],
      },
      {
        type: "choice",
        id: "q35",
        text: "How much technical knowledge do you have about how AI works?",
        options: [
          { value: "expert", label: "Expert — I work on AI systems often or have a deep understanding of the field" },
          { value: "advanced", label: "Advanced — I understand how language models and algorithms work" },
          { value: "intermediate", label: "Intermediate — I am familiar with prompting and recommendation systems" },
          { value: "basic", label: "Basic — I've read a few articles or watched videos on AI tools" },
          { value: "elementary", label: "Elementary — I have limited knowledge of AI tools but have used them" },
          { value: "none", label: "None — it's mostly a mystery to me or I haven't used them" },
        ],
      },
    ],
  },
  {
    title: "Almost done",
    instruction: "Last step. Leave your details if you'd like to be notified when V2 launches — or skip them entirely and stay anonymous.",
    questions: [], // contact & consent rendered separately
  },
];
