"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import brandLogo from "../../work/vocabulary-reading-web-publish/ms-trang-trieu-education-logo.png";
import {
  generatedLevel1Academic,
  generatedLevel1Lessons,
  generatedLevel1Vocabulary,
  generatedLevel2Academic,
  generatedLevel2Lessons,
  generatedLevel2Vocabulary,
} from "./real-course.generated";

type LessonMedia = {
  videoSrc: string; posterSrc: string; duration: number; segments: [number, number][];
  sourceTitle: string; sourceUrl: string; credit: string; aspectRatio?: string;
};

type Lesson = {
  day: string; category: string; title: string; kicker: string; level: string;
  paragraphs: string[]; answers: string[]; essay: { question: string; plan: string[]; language: string[] };
  media?: LessonMedia;
};

type AcademicNote = {
  code: string; style: string; focus: string; signals: string[];
  paraphrases: [string, string, string, number?, number?][];
};

const lessonLibrary: Lesson[] = [
  {
    day: "DAY 01", category: "CURRENT AFFAIRS", title: "When the school day moves",
    kicker: "How should schools respond when extreme heat becomes part of everyday life?", level: "B1+ · 3:35",
    answers: ["unusually hot","earlier than usual","shaded areas","drinking-water stations","reduce concentration","students' health","7:45 a.m.","35 degrees","moved indoors","dizzy","initially concerned","responsible","longer-term changes","energy-efficient fans","local weather data","flexible timetable","miss important lessons","public transport","working parents","carefully planned","climate change","practical decisions","safe and focused","changing world","offer useful lessons"],
    paragraphs: [
      "Across several cities, schools are changing their routines as [1] weather becomes more common. Some now begin lessons [2], while others have created [3] and installed extra [4]. According to local officials, these changes are not simply about comfort. High temperatures can [5] and may even affect [6].",
      "At Greenfield Secondary School, the day now starts at [7]. Outdoor sports are [9] whenever temperatures reach [8]. The new timetable was introduced after students reported feeling tired and [10] during afternoon lessons. Parents were [11], but most now agree that the school has made a [12] decision.",
      "The school is also considering [13]. These include planting more trees, fitting [14], and using [15] to decide when pupils should remain inside. Teachers say that a [16] allows them to protect students without cancelling classes completely. Their main concern is that children should not [17] simply because the weather is difficult.",
      "Changing the timetable is not simple. Schools must consider [18], meal schedules, and the needs of [19]. Any new arrangement has to be [20] and clearly explained. Yet as [21] affects more communities, head teachers are increasingly expected to make [22] that keep young people [23]. Greenfield's experiment may therefore [25] for schools preparing for a [24]."
    ],
    essay: {
      question: "Some people believe schools should change their timetable during extreme weather. Do you agree or disagree? Write 130–160 words.",
      plan: ["State your opinion clearly", "Explain two effects on learning or health", "Address one practical difficulty", "End with a realistic recommendation"],
      language: ["It is widely recognised that…", "A further consideration is…", "Provided that…", "On balance, I believe…"]
    }
  },
  {
    day: "DAY 02", category: "SCIENCE", title: "The memory factory at night",
    kicker: "Sleep is not empty time: your brain is editing, organising and saving the day.", level: "B2 · 3:45",
    answers: ["protect their sleep","does more than rest","collected during the day","long-term memories","recent experiment","at least eight hours","nearly 40 percent","stayed awake late","checking messages","delay sleep","bright screens","remain alert","outside the bedroom","same bedtime routine","practised consistently","memory and mood","quality matters","briefly wake up","deep sleep","solve difficult problems","creative connections","extra revision","less productive","work with the brain","competing against it"],
    paragraphs: [
      "New research is offering teenagers another reason to [1]. During the night, the brain [2]. It organises information [3] and helps turn new experiences into [4]. In one [5], students who slept for [6] remembered [7] more information than those who [8].",
      "Researchers warn that [9] in bed can [10]. One reason is that [11] encourage the brain to [12] when it should be slowing down. Their advice is practical: lower the lights, leave the phone [13], and follow the [14] each evening. These habits may sound simple, but when [15], they can improve both [16].",
      "The amount of sleep is important, but [17] too. Noise, stress, or an uncomfortable room can cause people to [18], interrupting the stages of [19] that support learning. Scientists have also found that a rested mind may [20] more successfully because it can form [21] between ideas.",
      "For students, the message is not that sleep should replace study. Rather, sleep is part of an effective study plan. An hour of [22] at midnight may be [23] than reviewing earlier and going to bed on time. The best routine is one that allows effort, recovery, and repetition to [24] instead of [25]."
    ],
    essay: {
      question: "Schools should teach sleep habits as seriously as study skills. To what extent do you agree? Write 130–160 words.",
      plan: ["Introduce the link between sleep and learning", "Give one scientific reason", "Consider personal responsibility", "Reach a balanced conclusion"],
      language: ["Evidence suggests that…", "This is particularly relevant to…", "Nevertheless…", "For this reason…"]
    }
  },
  {
    day: "DAY 03", category: "TEEN LIFE", title: "The 9 p.m. experiment",
    kicker: "A seven-day phone challenge asks whether a small boundary can create a calmer evening.", level: "B1+ → B2 · 3:40",
    answers: ["fourteen-year-olds","seven-day digital detox","nine o'clock","social media","recorded how they felt","first two nights","tempted","notifications","end of the week","fell asleep faster","more focused","abandon social media","small boundaries","more useful","less demanding","surprisingly refreshing","quiet hour","prepare for the next day","proper conversation","fear of missing out","automatic habit","choose when to connect","complete ban","control their attention","what deserves it"],
    paragraphs: [
      "A group of [1] in Bristol recently tried a [2]. After [3] each evening, they stopped using [4] and [5]. The aim was not to prove that phones are harmful, but to discover whether one small change could improve their evenings.",
      "During the [6], several participants admitted that they were [7] to check their phones whenever they heard [8]. By the [9], however, most said they [10] and felt [11] in class. The experiment did not persuade everyone to [12]. Instead, it showed that [13] can make technology feel [14] and [15].",
      "One student described the challenge as [16]. Another said the [17] before bed gave her time to read, [18], and have a [19] with her family. A few participants still worried about the [20], but they gradually realised that most online updates could wait until morning.",
      "The researchers behind the project say the real problem is often not the device itself but the [21] of checking it. They want teenagers to [22] rather than respond to every alert. A [23] may be unrealistic, especially when students use online tools for schoolwork. The more useful goal is to help young people [24] and decide [25]."
    ],
    essay: {
      question: "Teenagers should avoid social media after 9 p.m. Do the advantages outweigh the disadvantages? Write 130–160 words.",
      plan: ["Describe the proposed boundary", "Develop the strongest advantage", "Acknowledge one disadvantage", "Give a practical final judgement"],
      language: ["One clear benefit is…", "Opponents may argue that…", "This concern can be addressed by…", "The advantages therefore…"]
    }
  }
];

const humourLesson: Lesson = {
  day: "DAY 04", category: "HUMOUR & STORYTELLING", title: "The presentation that answered back",
  kicker: "A light-hearted school story with a useful lesson about technology, timing and staying calm.", level: "B1+ → B2 · 3:30",
  answers: ["school science fair","carefully prepared","voice-controlled assistant","impressive introduction","unexpectedly replied","entire audience","complete silence","technical problem","remain calm","carried on speaking","another question","weather forecast","burst out laughing","embarrassing moment","part of the performance","quick decision","sense of humour","won the audience over","main argument","support human communication","replace it completely","minor disaster","memorable presentation","confidence and flexibility","successful speaking"],
  paragraphs: [
    "During a [1], a student named Leo gave a [2] presentation about artificial intelligence. To make his talk more interesting, he brought a [3] onto the stage. His plan was simple: after an [4], the machine would provide one short example of how spoken commands work.",
    "At first, everything went perfectly. Then the assistant [5] to a comment made by someone in the [6]. There was a moment of [7] while Leo tried to understand the [8]. Instead of panicking, he decided to [9] and [10] as if nothing unusual had happened.",
    "Unfortunately, when Leo asked [11], the device announced the next day's [12]. The students [13]. What could have been an [14] suddenly became [15]. Leo made a [16]: he thanked the assistant for its enthusiasm and used his [17] to [18].",
    "He then returned to his [19]—that technology should [20], not [21]. The [22] actually made the final message clearer. Although Leo did not give the most perfect talk, he gave the most [23]. His teacher later said that [25] depends not only on preparation, but also on [24]."
  ],
  essay: { question: "", plan: [], language: [] }
};

const level2Lessons: Lesson[] = [lessonLibrary[1], lessonLibrary[0], lessonLibrary[2], humourLesson].map((lesson, index) => ({
  ...lesson,
  day: `DAY 0${index + 1}`,
  category: index === 0 ? "SCIENCE" : index === 1 ? "NEWS & ANALYSIS" : index === 2 ? "SOCIAL SCIENCE" : "HUMOUR & STORYTELLING",
  title: index === 2 ? "Attention by design" : lesson.title,
}));

const level2AcademicBridge: AcademicNote[] = [
  { code: "FL-P01", style: "PARAPHRASE PRACTICE · SCIENCE", focus: "Follow a scientific explanation and notice how the same idea can be reworded.", signals: ["The research suggests that…", "One reason is that…", "Scientists have also found that…", "For students, the message is…"], paraphrases: [["protect their sleep", "maintain healthy sleep habits", "Replace a common verb with a more formal verb phrase."], ["does more than rest", "performs functions beyond resting", "Use a formal verb and replace 'more than' with 'beyond'."], ["collected during the day", "gathered throughout the day", "Use synonyms for both the verb and the time phrase."], ["long-term memories", "information retained over time", "Explain a compact noun phrase with a longer description."], ["a recent experiment", "a study conducted lately", "Replace the noun and expand the adjective into a clause."], ["at least eight hours", "no fewer than eight hours", "Change a minimum expression without changing the number."], ["delay sleep", "postpone falling asleep", "Replace one verb with a more precise verb phrase."], ["remain alert", "stay mentally awake", "Use a close verb and make the meaning of 'alert' explicit."], ["quality matters", "how well you sleep is important", "Expand a noun phrase into a clause."], ["less productive", "less effective", "Use a close synonym that preserves the comparison."]] },
  { code: "FL-P02", style: "PARAPHRASE PRACTICE · NEWS", focus: "Separate a reported fact, its evidence and its possible consequence.", signals: ["According to local officials…", "The school is also considering…", "Their main concern is…", "Yet as the situation changes…"], paraphrases: [["unusually hot weather", "exceptionally high temperatures", "Replace an everyday adjective with a more formal one."], ["begin lessons earlier than usual", "move the school start time forward", "Rebuild the comparison as a phrasal expression."], ["shaded areas", "spaces protected from direct sunlight", "Expand an adjective into a descriptive phrase."], ["drinking-water stations", "places where students can refill water", "Explain a compound noun with a relative clause."], ["reduce concentration", "make it harder to focus", "Explain an academic noun with an everyday verb."], ["affect students' health", "have an impact on pupils' wellbeing", "Change a verb into a noun phrase and use synonyms."], ["moved indoors", "relocated inside", "Use a more formal verb with the same direction."], ["longer-term changes", "adjustments designed for the future", "Replace the adjective with a purpose phrase."], ["flexible timetable", "adaptable school schedule", "Replace both the adjective and the noun."], ["carefully planned", "designed with care", "Change an adverb into a prepositional phrase."]] },
  { code: "FL-P03", style: "PARAPHRASE PRACTICE · SOCIAL SCIENCE", focus: "Follow an example and connect it to a broader conclusion.", signals: ["The aim was not to…, but to…", "Instead, it showed that…", "The researchers say…", "The more useful goal is…"], paraphrases: [["a seven-day digital detox", "a week-long break from devices", "Replace the noun phrase with an accessible explanation."], ["stopped using social media", "took a break from social platforms", "Use a phrasal expression and a synonym."], ["recorded how they felt", "kept track of their emotions", "Replace a reporting verb with a collocation."], ["tempted to check their phones", "felt an urge to look at their devices", "Explain one adjective with a noun phrase."], ["fell asleep faster", "took less time to fall asleep", "Reverse the comparison while preserving meaning."], ["more focused in class", "concentrated better during lessons", "Change an adjective into a verb and replace the setting."], ["small boundaries", "limited restrictions", "Move from an everyday expression to a formal noun phrase."], ["the quiet hour before bed", "a screen-free period at night", "Replace the descriptive phrase with a category label."], ["fear of missing out", "anxiety about being excluded from updates", "Unpack a familiar expression into its full meaning."], ["control their attention", "manage what they focus on", "Replace an abstract noun with a clause."]] },
  { code: "FL-P04", style: "PARAPHRASE PRACTICE · STORYTELLING", focus: "Follow events in order and notice how the speaker signals a change in tone.", signals: ["At first…", "Then…", "Instead of…", "Although…"], paraphrases: [["a carefully prepared presentation", "a thoroughly planned talk", "Replace the adverb, verb and noun with close synonyms."], ["unexpectedly replied", "responded without warning", "Change an adverb into a prepositional phrase."], ["complete silence", "a moment when nobody made a sound", "Expand a noun phrase into a descriptive clause."], ["a technical problem", "an issue with the equipment", "Use a close noun and make the context explicit."], ["remain calm", "avoid panicking", "Express a positive state by avoiding its opposite."], ["carried on speaking", "continued the talk", "Replace a phrasal verb with a formal verb."], ["burst out laughing", "laughed suddenly", "Unpack an idiom into a direct meaning."], ["an embarrassing moment", "an awkward situation", "Replace both the adjective and the noun."], ["won the audience over", "gained the listeners' support", "Replace an idiom with a formal phrase."], ["a minor disaster", "a small-scale failure", "Reduce the dramatic expression while preserving the evaluation."]] }
];

type VocabularyNote = { term: string; meaning: string; note: string };

const level2LessonVocabulary: VocabularyNote[][] = [
  [
    { term: "long-term memories", meaning: "ký ức dài hạn", note: "Information stored in the brain for a long period, not just briefly." },
    { term: "recent experiment", meaning: "thí nghiệm gần đây", note: "Recent describes something that happened not long ago." },
    { term: "remain alert", meaning: "duy trì sự tỉnh táo", note: "Remain means continue to be; alert means awake and ready to respond." },
    { term: "practised consistently", meaning: "được thực hiện đều đặn", note: "Consistently means repeatedly and regularly in the same reliable way." },
    { term: "quality matters", meaning: "chất lượng cũng quan trọng", note: "Matter is a verb here, meaning be important." },
    { term: "deep sleep", meaning: "giấc ngủ sâu", note: "A stage of sleep in which the body and brain recover most effectively." },
    { term: "creative connections", meaning: "những liên hệ sáng tạo", note: "New or unusual links formed between different ideas." },
    { term: "less productive", meaning: "kém hiệu quả hơn", note: "Productive means producing useful results or completing meaningful work." },
    { term: "work with the brain", meaning: "hoạt động thuận theo não bộ", note: "Use a routine that supports how the brain naturally learns and recovers." },
    { term: "competing against it", meaning: "đi ngược lại, cạnh tranh với nó", note: "Compete against means act in opposition instead of supporting something." },
  ],
  [
    { term: "unusually hot", meaning: "nóng bất thường", note: "Unusually means in a way that is different from what is normal or expected." },
    { term: "shaded areas", meaning: "khu vực có bóng râm", note: "Places protected from direct sunlight." },
    { term: "drinking-water stations", meaning: "trạm nước uống", note: "Places where people can drink or refill safe water." },
    { term: "reduce concentration", meaning: "làm giảm khả năng tập trung", note: "Reduce means make something smaller, weaker or less effective." },
    { term: "initially concerned", meaning: "ban đầu cảm thấy lo ngại", note: "Initially means at first; concerned means worried about a possible problem." },
    { term: "responsible decision", meaning: "quyết định có trách nhiệm", note: "A careful decision that considers safety and possible consequences." },
    { term: "longer-term changes", meaning: "những thay đổi dài hạn hơn", note: "Changes designed to continue or have effects far into the future." },
    { term: "energy-efficient fans", meaning: "quạt tiết kiệm năng lượng", note: "Energy-efficient equipment uses less power to do the same job." },
    { term: "flexible timetable", meaning: "thời khóa biểu linh hoạt", note: "A schedule that can be adjusted when circumstances change." },
    { term: "carefully planned", meaning: "được lên kế hoạch cẩn thận", note: "Prepared thoughtfully before action is taken." },
  ],
  [
    { term: "digital detox", meaning: "khoảng thời gian tạm ngừng thiết bị số", note: "A deliberate break from phones, social media or other digital devices." },
    { term: "tempted", meaning: "bị thôi thúc, muốn làm dù biết không nên", note: "Feeling a strong desire to do something that may not be helpful." },
    { term: "notifications", meaning: "thông báo trên thiết bị", note: "Messages or alerts that tell users about new activity." },
    { term: "more focused", meaning: "tập trung hơn", note: "Able to give more attention to one task without distraction." },
    { term: "abandon social media", meaning: "từ bỏ mạng xã hội", note: "Abandon means stop using or leave something completely." },
    { term: "small boundaries", meaning: "những giới hạn nhỏ", note: "Simple rules that control when or how something is used." },
    { term: "surprisingly refreshing", meaning: "sảng khoái hơn một cách bất ngờ", note: "Refreshing describes something that restores energy or calm." },
    { term: "fear of missing out", meaning: "nỗi sợ bị bỏ lỡ thông tin hoặc sự kiện", note: "Often shortened to FOMO: anxiety that others are experiencing something without you." },
    { term: "automatic habit", meaning: "thói quen diễn ra gần như tự động", note: "A repeated action done without making a conscious decision each time." },
    { term: "control their attention", meaning: "kiểm soát sự chú ý", note: "Choose deliberately what deserves focus instead of reacting automatically." },
  ],
  [
    { term: "voice-controlled assistant", meaning: "trợ lý điều khiển bằng giọng nói", note: "A device or program that responds to spoken commands." },
    { term: "unexpectedly replied", meaning: "bất ngờ trả lời", note: "Unexpectedly means in a way that was not predicted or planned." },
    { term: "complete silence", meaning: "sự im lặng hoàn toàn", note: "A moment when nobody makes any sound." },
    { term: "technical problem", meaning: "sự cố kỹ thuật", note: "A problem involving equipment, software or another technical system." },
    { term: "remain calm", meaning: "giữ bình tĩnh", note: "Continue to be relaxed and controlled during a difficult moment." },
    { term: "carried on speaking", meaning: "tiếp tục nói", note: "Carry on is a phrasal verb meaning continue an activity." },
    { term: "burst out laughing", meaning: "bỗng bật cười", note: "An idiom for starting to laugh suddenly and strongly." },
    { term: "embarrassing moment", meaning: "khoảnh khắc gây ngượng ngùng", note: "A situation that makes someone feel uncomfortable or ashamed." },
    { term: "won the audience over", meaning: "chinh phục được khán giả", note: "An idiom meaning gain someone's support, approval or affection." },
    { term: "confidence and flexibility", meaning: "sự tự tin và khả năng ứng biến", note: "Flexibility here means adapting successfully when events do not go as planned." },
  ],
];

const level1Lessons: Lesson[] = [
  {
    day: "DAY 01", category: "SCIENCE", title: "Why leaves change colour",
    kicker: "A simple look at what happens inside a leaf when the seasons change.", level: "A2+ → B1 · 3:20",
    answers: ["green colour", "make food", "sunlight", "warmer months", "become shorter", "less light", "slowly breaks down", "yellow colours", "were already there", "red colours", "sugar", "cool nights", "different weather", "same tree", "brightest leaves", "enough rain", "early frost", "fall sooner", "healthy tree", "normal process", "keep water", "cold season", "spring returns", "new leaves", "quiet preparation"],
    paragraphs: [
      "Most leaves have a [1] because they contain chlorophyll. This useful material helps plants [2] by using [3]. During the [4], there is plenty of light, so trees can keep their leaves green and active.",
      "In autumn, the days [5] and trees receive [6]. The chlorophyll [7]. When the green disappears, the [8] become easy to see. These colours [9], but the green chlorophyll covered them during summer.",
      "Some leaves also produce [10] from [11] left inside them. Sunny days and [12] can make these colours stronger. However, [13] means that even the [14] may look different from one year to the next. The [15] often appear after [16], while an [17] can make leaves [18].",
      "A changing leaf does not usually mean an unhealthy plant. For a [19], losing leaves is a [20]. It helps the tree [21] during the [22]. When [23], the tree uses stored energy to grow [24]. Autumn colour is therefore a sign of [25], not simply an ending."
    ],
    essay: { question: "", plan: [], language: [] }
  },
  {
    day: "DAY 02", category: "NEWS & COMMUNITY", title: "The library after dark",
    kicker: "One town tests later opening hours to give teenagers a safe place to study.", level: "A2+ → B1 · 3:25",
    answers: ["local library", "two hours later", "three evenings", "quiet place", "homework", "busy homes", "free internet", "group tables", "simple snacks", "first week", "more than sixty", "borrow books", "finish projects", "ask for help", "extra staff", "safety rules", "sign in", "emergency contact", "positive response", "too much noise", "separate room", "six-week trial", "visitor numbers", "students' comments", "permanent service"],
    paragraphs: [
      "A [1] has started closing [2] on [3] each week. The plan gives teenagers a [4] where they can do [5]. For students who live in [6], the library can be easier to use than a kitchen table.",
      "The building offers [7], several [8], and a small area with [9]. During the [10], [11] young people visited after the normal closing time. Some came to [12], while others wanted to [13] or [14] from a librarian.",
      "The later hours require [15] and clear [16]. Every student must [17] and provide an [18]. Parents have given a mostly [19]. A few people worried about [20], so the library opened a [21] for group work.",
      "The new schedule is a [22]. At the end, the town will study [23] and read [24]. If the project continues to be useful, the later opening hours may become a [25]."
    ],
    essay: { question: "", plan: [], language: [] }
  },
  {
    day: "DAY 03", category: "TEEN LIFE", title: "The two-minute start",
    kicker: "A small study habit can make a difficult task feel easier to begin.", level: "A2+ → B1 · 3:15",
    answers: ["difficult task", "two minutes", "open the book", "write the title", "first question", "finish everything", "begin moving", "small action", "less frightening", "twenty students", "one school week", "short timer", "without checking", "mobile phones", "continued working", "timer ended", "early success", "sense of progress", "clear plan", "suitable goal", "two-minute method", "solve every problem", "starting point", "regular practice", "stronger habit"],
    paragraphs: [
      "When students face a [1], they often wait for the perfect moment to begin. The two-minute method gives a simpler rule: work for only [2]. A student might [3], [4], or read the [5].",
      "The aim is not to [6] in such a short time. It is to help the mind [7]. Once a person completes one [8], the task often feels [9]. This idea was tested by [10] during [11].",
      "Before studying, each student set a [12]. During that time, they worked [13] messages on their [14]. Most students [15] after the [16]. They said the [17] gave them a [18].",
      "The method works best with a [19] and a [20]. The [21] cannot help someone [22] immediately. It is only a [23]. With [24], however, that small start can grow into a [25]."
    ],
    essay: { question: "", plan: [], language: [] }
  },
  {
    day: "DAY 04", category: "HUMOUR & STORYTELLING", title: "The lunchbox mix-up",
    kicker: "A small mistake at lunch becomes a funny lesson about labels and kindness.", level: "A2+ → B1 · 3:20",
    answers: ["school trip", "blue lunchboxes", "same shop", "name label", "picked up", "very heavy", "bus stopped", "cheese sandwich", "three boiled eggs", "tiny note", "Dear Dad", "started laughing", "wrong lunchbox", "front seat", "school office", "phone number", "local museum", "lunch break", "surprised father", "chicken salad", "chocolate cake", "shared the food", "clear labels", "funny memory", "simple mistake"],
    paragraphs: [
      "On a [1], Minh and his teacher both carried [2] from the [3]. Minh's box had no [4]. When the class left the bus, he quickly [5] the box beside his bag. It felt [6], but he did not check it.",
      "When the [7] for lunch, Minh expected a [8]. Instead, he found [9] and a [10] that began with the words [11]. His friends [12] when they realised he had the [13].",
      "The teacher's lunch was still near the [14]. Luckily, the box contained the [15] and a [16]. A worker from the [17] called during the [18]. Soon, a [19] arrived with Minh's real lunch: [20] and a large piece of [21].",
      "Everyone [22], and nobody stayed hungry. After the trip, the teacher asked students to use [23] on their bags and boxes. The class gained a [24] from a [25]."
    ],
    essay: { question: "", plan: [], language: [] }
  }
];

const level1AcademicBridge: AcademicNote[] = [
  { code: "FL1-P01", style: "PARAPHRASE PRACTICE · SCIENCE", focus: "Match common science phrases with a clear expression of the same meaning.", signals: ["During the warmer months…", "In autumn…", "However…", "When spring returns…"], paraphrases: [["make food", "produce food", "Replace a common verb with a simple academic verb."], ["warmer months", "the warm part of the year", "Explain a short time phrase in more words."], ["become shorter", "do not last as long", "Change an adjective into a verb phrase."], ["slowly breaks down", "gradually disappears", "Use close synonyms for the adverb and verb."], ["were already there", "existed before", "Replace an everyday phrase with a shorter formal one."], ["different weather", "changes in weather conditions", "Use a noun phrase instead of an adjective."], ["fall sooner", "drop earlier", "Use two direct synonyms."], ["normal process", "natural change", "Replace both words with close meanings."], ["keep water", "save water", "Use a simpler synonym for the verb."], ["spring returns", "spring comes again", "Restate the verb with a familiar phrase."]] },
  { code: "FL1-P02", style: "PARAPHRASE PRACTICE · NEWS", focus: "Notice how a short news report repeats facts using different words.", signals: ["The plan gives…", "During the first week…", "A few people worried…", "At the end…"], paraphrases: [["two hours later", "an extra two hours", "Change a time comparison into a quantity phrase."], ["quiet place", "peaceful space", "Replace both words with close synonyms."], ["busy homes", "homes with many distractions", "Explain what the adjective means."], ["free internet", "internet access at no cost", "Expand a short phrase into a fuller definition."], ["finish projects", "complete school tasks", "Use a synonym and make the context clear."], ["ask for help", "request support", "Replace an everyday phrase with a formal one."], ["extra staff", "more workers", "Use a familiar quantity word and noun."], ["positive response", "supportive reaction", "Replace both words with close meanings."], ["separate room", "a different space", "Restate the idea with simpler words."], ["permanent service", "a service that continues", "Expand an adjective into a clause."]] },
  { code: "FL1-P03", style: "PARAPHRASE PRACTICE · TEEN LIFE", focus: "Connect everyday study language with useful academic alternatives.", signals: ["The aim is not to…", "Once…", "Most students…", "With regular practice…"], paraphrases: [["difficult task", "challenging piece of work", "Replace the adjective and explain the noun."], ["perfect moment", "ideal time", "Use two close synonyms."], ["finish everything", "complete the whole task", "Replace the verb and clarify the object."], ["begin moving", "start taking action", "Use a clearer action phrase."], ["less frightening", "easier to face", "Explain the feeling with a common expression."], ["without checking messages", "without looking at notifications", "Replace the verb and the noun."], ["continued working", "kept on studying", "Use a phrasal verb with the same meaning."], ["sense of progress", "feeling of moving forward", "Explain an abstract noun phrase."], ["suitable goal", "realistic target", "Use a more academic adjective and noun."], ["starting point", "first step", "Replace a formal phrase with a familiar one."]] },
  { code: "FL1-P04", style: "PARAPHRASE PRACTICE · STORYTELLING", focus: "Follow a simple story and match key events with equivalent expressions.", signals: ["When…", "Instead…", "Luckily…", "After the trip…"], paraphrases: [["picked up", "lifted and took", "Explain a phrasal verb with two simple verbs."], ["very heavy", "much heavier than expected", "Make the comparison in the story clear."], ["started laughing", "began to laugh", "Change the verb pattern without changing meaning."], ["wrong lunchbox", "lunchbox belonging to someone else", "Expand the adjective into an explanation."], ["near the front seat", "close to the seat at the front", "Reorder the same location details."], ["surprised father", "father who did not expect the call", "Expand an adjective into a relative clause."], ["shared the food", "ate the meal together", "Describe the action in a fuller way."], ["clear labels", "labels that are easy to read", "Expand an adjective into a clause."], ["funny memory", "an amusing event to remember", "Replace the adjective and explain the noun."], ["simple mistake", "small error", "Use two direct synonyms."]] }
];

const level1LessonVocabulary: VocabularyNote[][] = [
  [
    { term: "chlorophyll", meaning: "chất diệp lục", note: "The green material in leaves that helps plants use light to make food." },
    { term: "break down", meaning: "phân hủy, mất dần", note: "Here, break down means slowly disappear into simpler materials." },
    { term: "produce", meaning: "tạo ra, sản xuất", note: "Produce is a more formal verb meaning make something." },
    { term: "left inside", meaning: "còn lại bên trong", note: "Left means remaining, not the direction opposite to right." },
    { term: "frost", meaning: "sương giá", note: "A thin layer of ice that forms when the air is very cold." },
    { term: "normal process", meaning: "quá trình bình thường", note: "A natural series of changes that is expected to happen." },
    { term: "stored energy", meaning: "năng lượng dự trữ", note: "Energy kept by the plant for later use." },
    { term: "receive light", meaning: "nhận ánh sáng", note: "Receive means get something that comes from another source." },
    { term: "appear", meaning: "xuất hiện", note: "Appear means become visible or begin to be seen." },
    { term: "quiet preparation", meaning: "sự chuẩn bị âm thầm", note: "A calm process of getting ready for what comes next." }
  ],
  [
    { term: "opening hours", meaning: "giờ mở cửa", note: "The times when a place is open for people to use." },
    { term: "closing time", meaning: "giờ đóng cửa", note: "The time when a shop, library or service stops serving visitors." },
    { term: "provide", meaning: "cung cấp", note: "Provide means give something that people need or can use." },
    { term: "normal schedule", meaning: "lịch hoạt động thông thường", note: "The usual plan for when activities begin and end." },
    { term: "require", meaning: "yêu cầu, cần có", note: "Require means need something because it is necessary." },
    { term: "sign in", meaning: "ghi danh khi đến", note: "Write your name to show that you have arrived." },
    { term: "emergency contact", meaning: "người liên hệ khẩn cấp", note: "A person who can be called if something unexpected happens." },
    { term: "response", meaning: "phản hồi", note: "A reaction or answer to an idea, event or question." },
    { term: "trial", meaning: "giai đoạn thử nghiệm", note: "A test period used to learn whether a plan works well." },
    { term: "permanent", meaning: "lâu dài, cố định", note: "Continuing for a long time rather than only temporarily." }
  ],
  [
    { term: "face a task", meaning: "đối mặt với một nhiệm vụ", note: "Face means accept that a difficult activity must be dealt with." },
    { term: "perfect moment", meaning: "thời điểm hoàn hảo", note: "A time that seems completely right for doing something." },
    { term: "method", meaning: "phương pháp", note: "A planned way of doing something." },
    { term: "frightening", meaning: "gây sợ, gây ngại", note: "Making someone feel afraid or unwilling to begin." },
    { term: "set a timer", meaning: "đặt hẹn giờ", note: "Choose a length of time on a clock or device." },
    { term: "notification", meaning: "thông báo", note: "A message or alert shown by a phone or computer." },
    { term: "progress", meaning: "sự tiến bộ", note: "Movement toward finishing a task or reaching a goal." },
    { term: "suitable", meaning: "phù hợp", note: "Right or appropriate for a particular person or purpose." },
    { term: "starting point", meaning: "điểm bắt đầu", note: "The first step in a longer process." },
    { term: "regular practice", meaning: "sự luyện tập đều đặn", note: "Practice repeated often on a steady schedule." }
  ],
  [
    { term: "mix-up", meaning: "sự nhầm lẫn", note: "A small mistake in which two people or things are confused." },
    { term: "name label", meaning: "nhãn ghi tên", note: "A small piece of paper or material showing who owns an item." },
    { term: "pick up", meaning: "nhấc lên và cầm đi", note: "Lift something and take it with you." },
    { term: "expected", meaning: "đã mong đợi", note: "Thought something would probably happen or be present." },
    { term: "instead", meaning: "thay vào đó", note: "Used when one thing replaces another thing." },
    { term: "realise", meaning: "nhận ra", note: "Suddenly understand a fact or situation." },
    { term: "belong to", meaning: "thuộc về", note: "Be owned by a particular person." },
    { term: "luckily", meaning: "may mắn thay", note: "Used to introduce a good result in a difficult situation." },
    { term: "shared", meaning: "chia sẻ", note: "Used something together or gave part of it to others." },
    { term: "memory", meaning: "kỷ niệm; ký ức", note: "An event or experience that a person remembers." }
  ]
];

const realSourceLessons: Lesson[] = [
  {
    day: "REAL VOICE 01", category: "SCIENCE & HEALTH", title: "What does a phone do to the brain?",
    kicker: "A real VOA health report separates a measurable brain response from claims the study cannot yet prove.", level: "B1+ · 3:59 · REAL HUMAN SPEECH",
    answers: ["mobile phone", "all the time", "proven beyond question", "radio signals", "brain cancer", "government scientists", "at least 50 minutes", "brain cell activity", "meaning of their findings", "National Institute on Drug Abuse", "cell phone exposure", "long-lasting effects", "47 healthy volunteers", "placed against both ears", "activated but muted", "both phones turned off", "closest to the activated phone", "increase in metabolism", "radio frequencies", "activate the human brain", "used sugar to produce energy", "seven percent higher", "a wired headset", "settle questions", "epidemiological studies"],
    paragraphs: [
      "I'm Carolyn Presutti with the VOA Special English Health Report. How important is your [1], better known to Americans as a cell phone? Many people say they use the device [2]. So far, no studies have [3] that the [4] from cell phones cause [5] or other health problems. But a new study by [6] in the United States has some people wondering what to think.",
      "The scientists found that holding a cell phone to your ear for [7] increases [8]. Even the scientists themselves are not sure about the [9]. Dr. Nora Volkow led the study. She heads the [10], part of the National Institutes of Health. Dr. Volkow says she would not be concerned that 50 minutes of [11] would harm anyone. But she says the research does show the need to study whether there are [12] of repeated exposure over several years.",
      "Her team studied [13] in 2009. The volunteers had cell phones [14] while the scientists made images of their brain activity. As part of the test, one phone was [15] for 50 minutes. The other phone was off. After that, the people were tested with [16]. Dr. Volkow says the brain scans showed increased activity in brain cells [17]. She said the right area of the brain that was very close to the antenna showed the largest [18] compared to when the telephones were off.",
      "Even though the [19] emitted from current cell phones are very weak, they are able to [20]. The scans showed how the brain cells [21], a normal activity. The activity was [22] in areas of the brain closest to the cell phone antenna. Experts say people who are concerned about mobile phones can take steps like using [23]. Dr. Giuseppe Esposito is a nuclear medicine expert at Georgetown University Medical Center in Washington. He says better kinds of research are still needed to [24] about cell phone safety. These studies would take years. He said there should be [25] of a population of high users or light users of cell phones and then see what happens over the years. For VOA Special English, I'm Carolyn Presutti."
    ],
    essay: { question: "", plan: [], language: [] },
    media: {
      videoSrc: "https://drive.usercontent.google.com/download?id=1EmP1G3R7kbdkoYt0xEZo7QbwuJfrjNHf&export=download&confirm=t",
      posterSrc: "media/real-source-trials/L1-mobile-brain.webp",
      duration: 238.63,
      segments: [[0, 36.8], [36.8, 88.9], [88.9, 163.1], [163.1, 238.63]],
      sourceTitle: "After Brain Study, New Questions About Mobile Phones",
      sourceUrl: "https://www.youtube.com/watch?v=g-yOcdTHrgg",
      credit: "VOA Learning English · real human report"
    }
  },
  {
    day: "REAL VOICE 01", category: "NEUROSCIENCE & SOCIETY", title: "How does reading change the brain?",
    kicker: "A fast-paced BBC World Service feature connects neuroscience, writing systems, screen habits and the social value of deep reading.", level: "B2+/C1 · 5:54 · NATURAL-SPEED BBC",
    answers: ["thousands of years", "written language", "innately", "evolutionary time scale", "dedicated reading brain", "co-opt", "earliest writing systems", "sophisticated", "sounds and meanings", "all four lobes", "brain connectivity", "logographic system", "visual association", "corroborated", "remained intact", "requirements of Chinese", "anterior insula", "empathic processes", "adaptable", "passive scrolling", "susceptible to misinformation", "think critically", "attentional executive function", "hyper stimulated", "deep reading"],
    paragraphs: [
      "Clicking on this video activated circuits in your brain that took [1] to develop: the ones required for reading. We think of language as natural and reading is [2], so it must be natural. But it isn't. Scientific studies indicate that a neurotypical brain is born with the circuitry that allows our eyes to see and our vocal cords to produce sounds, but it doesn't [3] have the ability to read. From an [4], our brain hasn't had enough time to develop a [5]. And so, to build a reading brain network, we [6] parts of the brain involved in vision and auditory processing, language, attention and affect.",
      "The Sumerian cuneiform symbols are thought to be one of the [7] in the world, dating back to around 3300 BC. Around the same time, Egyptians started developing their hieroglyphics. Symbols evolved over time. The more we read and wrote, the more [8] they became, becoming the letters and characters we recognise today. Scientists now know that reading activates the brain so that letters and words become associated with [9]. Reading is really a whole-brain process. It involves activation in [10] of the cortex. Developing a reading brain alters everything from brain activity to brain structure and [11].",
      "The language we read also shapes our brain. Chinese characters, for instance, are an example of a [12]. Each object or idea is represented by a symbol rather than by a set of letters of the alphabet. Research indicates that learning logographic writing systems activates different areas of the brain than learning an alphabet-based language like English. The areas involved in visual memory and [13] do more of the work.",
      "This theory was [14] after scientists studied a bilingual patient who knew both Chinese and English. The man suffered a massive stroke, which affected some areas of his brain, including his ability to read Chinese, but astonishingly, his proficiency in English [15]. It's a beautiful example of how the brain circuit reflects the [16], which inevitably means more visual memory and visual processing of those beautifully intricate symbols or characters. Whatever the language, reading not only impacts the brain, but it also affects us on a physical level. We might feel in our guts the nervousness or pain of a character. The [17], which is responsible for gastromotoric movement and feelings of nausea, pain and discomfort, is also the part of the brain associated with many of the [18].",
      "The brain is very [19]. Evidence suggests that it's already changing as a result of new technologies. Reading on a phone or tablet is generally [20], often interrupted by messages and alerts. When we read on screens, we tend to skim, and when we skim, we're more [21]. We need to support individuals in being able to [22] about the things that they're reading, because our ability to analyse and think deeply about the information we're consuming is fundamental to a democracy. Some academic research even suggests that children who use cell phones from an early age perform worse in school later in life. At eight years of age, the amount of digital exposure predicted their [23] processing and academic performance.",
      "The more digital exposure, the worse the academic outcomes. If that brain is constantly being distracted and [24], children may not be able to move from one stimulus to the next without a desire for ever quicker intervals between stimuli. They then go offline and say they're bored. It's a relatively new field of research, and some studies suggest that monitored, education-focused screen time can be beneficial to children. For parents concerned about navigating the digital world, the advice is to go back to basics: have children immersed in reading and model a reading life. The power of [25] is fundamental to our humanity. When we read deeply, we change our brains and who we are. That process of changing the minds and hearts of individuals changes society and allows us to build bigger, more beautiful futures."
    ],
    essay: { question: "", plan: [], language: [] },
    media: {
      videoSrc: "https://drive.usercontent.google.com/download?id=1kNWVm5cdOUl9No4sCvy-J2odfj2Jy6bZ&export=download&confirm=t",
      posterSrc: "media/real-source-trials/L2-reading-brain.webp",
      duration: 354.84,
      segments: [[0, 49], [49, 103], [103, 152], [152, 208], [208, 268], [268, 354.84]],
      sourceTitle: "How reading changes the way your brain works",
      sourceUrl: "https://www.youtube.com/watch?v=X1L1Hd3xfrU",
      credit: "BBC World Service · natural-speed narration and expert interviews",
      aspectRatio: "16 / 9"
    }
  },
  {
    day: "REAL VOICE 02", category: "LANGUAGE & ATTENTION", title: "Does bilingualism make you smarter?",
    kicker: "A real VOA report uses research evidence and the Stroop Test to explain how bilingual brains control attention.", level: "B1+/B2 · 4:00 · VOA REAL HUMAN SPEECH",
    answers: ["early 1950s", "scored lower on intelligence tests", "more than one language", "found the opposite", "American Association for the Advancement of Science", "does not necessarily make people smarter", "capture your attention", "monitor all of them", "controlling their attention", "Executive Control System", "most important cognitive system", "what to ignore", "measure the Executive Control System", "Stroop Test", "words in different colors", "ignore the word", "lighting up all these circuits", "a mechanism to override that", "continually practice this function", "active in their brain", "suppress one", "separate a word from its meaning", "different cultures", "four to five years later", "far behind the rest of the world"],
    paragraphs: [
      "I'm Carolyn Presutti with the VOA Special English Health Report. In the [1], researchers found that people [2] if they spoke [3]. Research in the 1960s [4]. So which is it? Researchers presented their newest studies in February at a meeting of the [5]. The latest evidence shows that being bilingual [6]. But researcher Ellen Bialystok says it probably does make you better at certain skills.",
      "She says, imagine driving down the highway. There are many things that could [7], and you really need to be able to [8]. Why would bilingualism make you any better at that? The answer, she says, is that bilingual people are often better at [9], a function called the [10]. She says it is possibly the [11] we have. It is where all of our decisions about what to attend to, [12], and what to process are made.",
      "Ms. Bialystok is a psychology professor at York University in Toronto, Canada. She says the best method to [13] is called the [14]. A person is shown [15]. The person has to [16], but say the color. The problem is that the words are all names of colors. She explains: you would have the word blue written in red, but you have to say red. But blue is [17] in your brain, and you really want to say blue. So you need [18], so that you can say red. That's the Executive Control System.",
      "Her work shows that bilingual people [19]. They have to, because both languages are [20] at the same time. They need to [21] to be able to speak in the other. This mental exercise might help in other ways, too. Researchers say bilingual children are better able to [22] and more likely to have friends from [23]. Bilingual adults are often [24] than others in developing dementia or Alzheimer's disease. Foreign language study has increased in the United States, but linguist Alison Mackey at Georgetown University in Washington, D.C. points out that English-speaking countries are still [25]. For VOA Special English, I'm Carolyn Presutti."
    ],
    essay: { question: "", plan: [], language: [] },
    media: {
      videoSrc: "https://drive.usercontent.google.com/download?id=1F3eSoQ_XaobATkI1kmz3mOf3uACSyL2L&export=download&confirm=t",
      posterSrc: "media/real-source-trials/L2-bilingual-brain.webp",
      duration: 239.93,
      segments: [[0, 52.4], [52.4, 107.2], [107.2, 166.8], [166.8, 239.93]],
      sourceTitle: "Are People Who Speak More Than One Language Smarter?",
      sourceUrl: "https://www.youtube.com/watch?v=6Ye-BeVyJ5M",
      credit: "VOA Learning English · real human report and expert quotations"
    }
  }
];

const realSourceAcademicBridge: AcademicNote[] = [
  {
    code: "FL1-R01", style: "PARAPHRASE PRACTICE · REAL SCIENCE REPORT", focus: "Distinguish what the study measured from what it has not proved.",
    signals: ["So far, no studies have…", "The scientists found that…", "Even the scientists themselves…", "Experts say…"],
    paraphrases: [
      ["proven beyond question", "established with complete certainty", "Replace the verb and unpack the fixed expression.", 18.5, 21.3],
      ["radio signals", "radio-frequency emissions", "Use a technical compound noun with the same reference.", 21.8, 23.1],
      ["wondering what to think", "uncertain how to interpret the result", "Turn an informal verb phrase into an academic description.", 33.4, 36.4],
      ["brain cell activity", "activity in the brain's cells", "Rebuild the compound noun as a prepositional phrase.", 44.0, 47.3],
      ["long-lasting effects", "effects that continue over time", "Expand the adjective into a relative clause.", 81.8, 84.2],
      ["repeated exposure", "being exposed again and again", "Change a noun phrase into a passive gerund phrase.", 84.2, 88.5],
      ["placed against both ears", "positioned next to each ear", "Use close synonyms and replace both with each.", 95.8, 101.4],
      ["activated but muted", "switched on with no sound", "Replace two technical verbs with familiar descriptions.", 107.7, 115.4],
      ["closest to the activated phone", "nearest the switched-on device", "Use comparative synonyms and replace the repeated noun.", 125.1, 135.8],
      ["settle questions about cell phone safety", "resolve uncertainties concerning phone safety", "Use formal synonyms for the verb and noun phrase.", 202.2, 213.0]
    ]
  },
  {
    code: "FL2-R01", style: "PARAPHRASE PRACTICE · BBC NEUROSCIENCE", focus: "Track explanations, evidence and consequences across fast narration and expert interviews.",
    signals: ["Scientific studies indicate…", "Research indicates…", "Evidence suggests…", "Some academic research…"],
    paraphrases: [
      ["develop a dedicated reading brain", "develop a specialised neural system for reading", "Replace the everyday noun with a precise neuroscience phrase.", 31, 38],
      ["co-opt parts of the brain", "repurpose existing neural regions", "Use a formal verb and a more concise technical noun phrase.", 38, 49],
      ["alters everything from brain activity to brain structure", "changes both neural function and physical organisation", "Compress the range into two parallel academic concepts.", 131, 143],
      ["represented by a symbol", "encoded through a single visual sign", "Change the passive verb and specify the type of representation.", 147, 157],
      ["This theory was corroborated", "The evidence supported this explanation", "Turn the passive reporting structure into an active one.", 212, 219],
      ["his proficiency in English remained intact", "his English reading ability was preserved", "Use a contextual synonym and a passive construction.", 223, 231],
      ["more susceptible to misinformation", "more vulnerable to false information", "Replace the adjective and unpack the formal noun.", 343, 349],
      ["think critically about the things that they're reading", "evaluate written information carefully", "Condense the clause into a formal verb phrase.", 349, 359],
      ["the amount of digital exposure predicted", "screen exposure was associated with later", "Shift from a predictive verb to a cautious research relationship.", 412, 423],
      ["immersed in reading", "deeply engaged in a reading-rich environment", "Expand the metaphor into an academic description.", 507, 518]
    ]
  },
  {
    code: "FL1-R02", style: "PARAPHRASE PRACTICE · VOA LANGUAGE REPORT", focus: "Follow an evidence-based explanation and connect an experiment to its wider implications.",
    signals: ["The latest evidence shows…", "And the answer, she says…", "The problem is that…", "This mental exercise might…"],
    paraphrases: [
      ["scored lower on intelligence tests", "achieved poorer results in intelligence testing", "Change the verb phrase and nominalise tests.", 6.4, 16.5],
      ["found the opposite", "produced the reverse finding", "Replace an everyday object with an academic noun.", 17.0, 21.6],
      ["does not necessarily make people smarter", "does not automatically increase intelligence", "Replace the verb phrase with an abstract noun.", 35.0, 42.6],
      ["better at certain skills", "more capable in particular abilities", "Use comparative and quantifier synonyms.", 43.7, 52.2],
      ["capture your attention", "draw your focus", "Replace both the verb and the noun.", 57.6, 62.2],
      ["monitor all of them", "keep track of every one", "Use a phrasal expression and an inclusive quantifier.", 62.7, 68.0],
      ["controlling their attention", "managing what they focus on", "Expand an abstract noun into a clause.", 73.0, 87.6],
      ["what to ignore", "which information to disregard", "Add the implied object and use a formal verb.", 95.8, 105.4],
      ["continually practice this function", "exercise this mental process repeatedly", "Replace the verb and shift the adverb.", 167.0, 173.0],
      ["suppress one", "prevent one language from becoming active", "Unpack a compact verb phrase using the context.", 180.9, 186.2]
    ]
  }
];

const realSourceVocabulary: VocabularyNote[][] = [
  [
    { term: "beyond question", meaning: "không còn nghi ngờ", note: "A fixed phrase meaning completely certain or proved." },
    { term: "radio signal", meaning: "tín hiệu vô tuyến", note: "An electromagnetic signal used to carry information wirelessly." },
    { term: "brain cell activity", meaning: "hoạt động của tế bào não", note: "Measurable activity produced by cells in the brain." },
    { term: "exposure", meaning: "sự tiếp xúc", note: "The state of being affected by something over a period of time." },
    { term: "muted", meaning: "đã tắt tiếng", note: "Switched on but producing no sound." },
    { term: "metabolism", meaning: "quá trình trao đổi chất", note: "Chemical processes that turn nutrients into energy." },
    { term: "emitted", meaning: "được phát ra", note: "Sent out as light, heat, sound or radiation." },
    { term: "wired headset", meaning: "tai nghe có dây", note: "A headset connected by a cable rather than radio signals." },
    { term: "settle a question", meaning: "giải quyết dứt điểm một vấn đề", note: "Provide enough evidence to reach a firm conclusion." },
    { term: "epidemiological study", meaning: "nghiên cứu dịch tễ học", note: "Research that follows health patterns across a population." }
  ],
  [
    { term: "circuitry", meaning: "hệ thống mạch thần kinh", note: "A connected system of neural pathways that performs a function." },
    { term: "innately", meaning: "một cách bẩm sinh", note: "Naturally present from birth rather than learned." },
    { term: "co-opt", meaning: "tận dụng cho chức năng mới", note: "Take an existing system and use it for a new purpose." },
    { term: "auditory processing", meaning: "xử lý thông tin thính giác", note: "The brain's interpretation of sounds and spoken information." },
    { term: "cuneiform", meaning: "chữ hình nêm", note: "An ancient writing system made with wedge-shaped marks." },
    { term: "cortex", meaning: "vỏ não", note: "The outer layer of the brain involved in complex thought and perception." },
    { term: "connectivity", meaning: "khả năng kết nối thần kinh", note: "The pattern and strength of connections between brain regions." },
    { term: "logographic", meaning: "thuộc hệ chữ biểu ý", note: "Using symbols to represent words, objects or ideas." },
    { term: "corroborate", meaning: "xác nhận bằng thêm bằng chứng", note: "Support a claim or theory with additional evidence." },
    { term: "susceptible", meaning: "dễ bị tác động", note: "Likely to be influenced or harmed by something." }
  ],
  [
    { term: "bilingual", meaning: "song ngữ", note: "Able to use two languages." },
    { term: "necessarily", meaning: "nhất thiết, tất yếu", note: "Used to say that something must be true in every case." },
    { term: "monitor", meaning: "theo dõi liên tục", note: "Watch or check something carefully over time." },
    { term: "cognitive system", meaning: "hệ thống nhận thức", note: "A mental system used for thinking, learning and deciding." },
    { term: "executive control", meaning: "khả năng kiểm soát điều hành", note: "The brain's ability to direct attention and manage competing information." },
    { term: "Stroop Test", meaning: "bài kiểm tra Stroop", note: "A task requiring a person to name a color while ignoring a conflicting word." },
    { term: "circuit", meaning: "mạch thần kinh", note: "A connected pathway through which activity travels in the brain." },
    { term: "override", meaning: "lấn át, vô hiệu hóa", note: "Use control to prevent an automatic response." },
    { term: "suppress", meaning: "kìm lại, ức chế", note: "Prevent an idea, response or language from becoming active." },
    { term: "dementia", meaning: "chứng sa sút trí tuệ", note: "A condition that seriously affects memory and thinking." }
  ]
];

// Fighter Listening now starts with verified real-human sources. The earlier
// synthetic practice drafts stay outside the student-facing lesson catalogue.
const lessons: Lesson[] = [
  realSourceLessons[0], realSourceLessons[2], ...(generatedLevel1Lessons as Lesson[]),
  realSourceLessons[1], ...(generatedLevel2Lessons as Lesson[]),
];
const academicBridge: AcademicNote[] = [
  realSourceAcademicBridge[0], realSourceAcademicBridge[2], ...(generatedLevel1Academic as AcademicNote[]),
  realSourceAcademicBridge[1], ...(generatedLevel2Academic as AcademicNote[]),
];
const lessonVocabulary: VocabularyNote[][] = [
  realSourceVocabulary[0], realSourceVocabulary[2], ...generatedLevel1Vocabulary,
  realSourceVocabulary[1], ...generatedLevel2Vocabulary,
];

const paraphraseOrder = [6, 1, 8, 0, 7, 3, 9, 4, 2, 5];
const fighterClasses = ["FIGHTER 5", "FIGHTER 6", "FIGHTER 7", "FIGHTER 8", "FIGHTER 9"];
const formLessonCodes = [
  ...Array.from({ length: 10 }, (_, index) => `FL1-R${String(index + 1).padStart(2, "0")} · REAL HUMAN LISTENING`),
  ...Array.from({ length: 10 }, (_, index) => `FL2-R${String(index + 1).padStart(2, "0")} · REAL HUMAN LISTENING`),
];
const formQuestionEntries = ["493387", "166904167", "1986170864", "707260550", "1338229682", "562418472", "556434685", "1080689249", "1457708675", "1877689499"];
type AccessConfig = { level: number; week: number; lessonIndex: number };
const weeklyAccess: Record<string, AccessConfig> = {
  "a7c9e2f4b6d1": { level: 1, week: 1, lessonIndex: 0 },
  "e3b8d1a6f9c2": { level: 1, week: 2, lessonIndex: 1 },
  "2zmksvvwo2vl": { level: 1, week: 3, lessonIndex: 2 },
  "2tsywa36yjcu": { level: 1, week: 4, lessonIndex: 3 },
  "6osb7ukftc3t": { level: 1, week: 5, lessonIndex: 4 },
  "dk1r8mj4owbg": { level: 1, week: 6, lessonIndex: 5 },
  "5ftfjzmrrozm": { level: 1, week: 7, lessonIndex: 6 },
  "q6nb8x9v2w2j": { level: 1, week: 8, lessonIndex: 7 },
  "bwgjrh83btma": { level: 1, week: 9, lessonIndex: 8 },
  "6r292cch4964": { level: 1, week: 10, lessonIndex: 9 },
  "8f3c1a7d9b2e": { level: 2, week: 1, lessonIndex: 10 },
  "ts2txtumw2ow": { level: 2, week: 2, lessonIndex: 11 },
  "hpedy2gq165c": { level: 2, week: 3, lessonIndex: 12 },
  "60juxgy64kvj": { level: 2, week: 4, lessonIndex: 13 },
  "9zzq6o7aavjr": { level: 2, week: 5, lessonIndex: 14 },
  "7ojte6vwom5e": { level: 2, week: 6, lessonIndex: 15 },
  "zbe725as3s8h": { level: 2, week: 7, lessonIndex: 16 },
  "g9x0gshmu2l9": { level: 2, week: 8, lessonIndex: 17 },
  "lwoc5x4tv416": { level: 2, week: 9, lessonIndex: 18 },
  "cztd3lpqg5co": { level: 2, week: 10, lessonIndex: 19 },
  // Preserve every original Video 1–4 URL after replacing the synthetic lessons.
  "c5f2a9d7e1b4": { level: 1, week: 3, lessonIndex: 2 },
  "f8a1c6e3d9b2": { level: 1, week: 4, lessonIndex: 3 },
  "4d8a2f6c1e9b": { level: 2, week: 2, lessonIndex: 11 },
  "7b1e9c3a5d8f": { level: 2, week: 3, lessonIndex: 12 },
  "2c6f8a4e1d7b": { level: 2, week: 4, lessonIndex: 13 },
  "r1v7k3m9q5x2": { level: 1, week: 1, lessonIndex: 0 },
  "v4m8q2s7k1d6": { level: 1, week: 2, lessonIndex: 1 },
  "t8n2c6p4w9h1": { level: 2, week: 1, lessonIndex: 10 },
};

const norm = (value: string) => value.toLowerCase().replace(/[.,’']/g, "").replace(/\s+/g, " ").trim();
const fillScript = (lesson: Lesson, paragraph?: number) => (paragraph === undefined ? lesson.paragraphs.join(" ") : lesson.paragraphs[paragraph]).replace(/\[(\d+)\]/g, (_, n) => lesson.answers[Number(n) - 1]);

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clipEndRef = useRef<number | null>(null);
  const fighterScope = useRef("");
  const [accessConfig] = useState<AccessConfig | null>(() => {
    if (typeof window === "undefined") return null;
    const access = new URLSearchParams(window.location.search).get("access") || "";
    return weeklyAccess[access] || null;
  });
  const [lessonIndex, setLessonIndex] = useState(() => accessConfig?.lessonIndex ?? 0);
  const [values, setValues] = useState<string[][]>(() => lessons.map(l => Array(l.answers.length).fill("")));
  const [submitted, setSubmitted] = useState(false);
  const [submittedScores, setSubmittedScores] = useState<{ listening: number; paraphrase: number } | null>(null);
  const [recordStatus, setRecordStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(.9);
  const [segment, setSegment] = useState("all");
  const [paraChoices, setParaChoices] = useState<number[]>(Array(10).fill(-1));
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentReady, setStudentReady] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(.9);
  const lesson = lessons[lessonIndex];
  const currentValues = values[lessonIndex];
  const liveScore = useMemo(() => currentValues.filter((v, i) => norm(v) === norm(lesson.answers[i])).length, [currentValues, lesson]);
  const liveParaScore = paraChoices.filter((choice, i) => choice === paraphraseOrder.indexOf(i)).length;
  const score = submittedScores?.listening ?? liveScore;
  const paraScore = submittedScores?.paraphrase ?? liveParaScore;
  const listeningComplete = currentValues.every(value => value.trim().length > 0);
  const listeningFilled = currentValues.filter(value => value.trim().length > 0).length;
  const paraphraseComplete = !paraChoices.includes(-1);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.playbackRate = rate;
      video.volume = volume;
    }
    clipEndRef.current = null;
    setVideoTime(0);
    setVideoDuration(lesson.media?.duration ?? 0);
    setSpeaking(false);
    setPaused(false);
  }, [lessonIndex]);
  const submissionKey = () => `fighter-listening:${accessConfig?.level}:${accessConfig?.week}:${studentClass}:${norm(studentName)}`;
  const buildSubmissionParams = (listeningScore: number, paraphraseScore: number) => {
    const params = new URLSearchParams({
      "entry.137349731": studentName.trim(),
      "entry.1458483854": String(listeningScore),
      "entry.1462331495": String(paraphraseScore),
      "entry.326079159": String(listeningScore + paraphraseScore),
      "entry.1874372205": studentClass,
      "entry.274579751": formLessonCodes[lessonIndex],
    });
    formQuestionEntries.forEach((entry, index) => params.set(`entry.${entry}`, String.fromCharCode(65 + paraChoices[index])));
    return params;
  };

  const submitAttempt = async () => {
    if (recordStatus === "saving" || !listeningComplete || !paraphraseComplete || submitted) return;
    const key = submissionKey();
    setSubmitted(true);
    setRecordStatus("saving");
    try {
      const record = await (window as any).IELTSFighterDurable.prepare(key, (saved: any) => {
        if (!saved?.submissionId) {
          saved = {
            values: [...currentValues],
            paraChoices: [...paraChoices],
            scores: { listening: liveScore, paraphrase: liveParaScore },
            submissionId: `fighter-listen-${crypto.randomUUID()}`,
            receipt: false,
            reconcileLegacy: Boolean(saved),
          };
        }
        if (!saved.payload) {
          const fields = Object.fromEntries(buildSubmissionParams(saved.scores.listening, saved.scores.paraphrase));
          formQuestionEntries.forEach((entry, index) => {
            fields[`entry.${entry}`] = String.fromCharCode(65 + saved.paraChoices[index]);
          });
          saved.payload = {
            source: "fighter-listening-submit",
            version: 1,
            action: "submitFighterListening",
            submissionId: saved.submissionId,
            reconcileLegacy: saved.reconcileLegacy === true,
            fields,
          };
        }
        return saved;
      });
      if (fighterScope.current !== key) return;
      setSubmittedScores(record.scores);
      await (window as any).IELTSFighterDurable.send(key, record);
      setRecordStatus("saved");
    } catch {
      setRecordStatus("error");
    }
  };

  const openLesson = async () => {
    const key = submissionKey();
    const attempt = await (window as any).IELTSFighterDurable.readAsync(key);
    if (attempt) {
      try {
        const all = values.map(row => [...row]);
        all[lessonIndex] = attempt.values;
        setValues(all);
        setParaChoices(attempt.paraChoices);
        setSubmittedScores(attempt.scores);
        setSubmitted(true);
        setRecordStatus(attempt.receipt === true ? "saved" : "saving");
      } catch {}
    }
    setStudentReady(true);
    if (attempt?.payload && !attempt.receipt) {
      try {
        await (window as any).IELTSFighterDurable.send(key, attempt);
        setRecordStatus("saved");
      } catch {
        setRecordStatus("error");
      }
    }
  };

  fighterScope.current = submissionKey();
  useEffect(() => {
    if (!studentReady) return;
    const key = submissionKey();
    return (window as any).IELTSFighterDurable.subscribe(key, (record: any) => {
      setSubmittedScores(record.scores);
      setSubmitted(true);
      setRecordStatus("saved");
    });
  }, [studentReady, studentName, studentClass]);

  const stopAudio = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (videoRef.current) videoRef.current.pause();
    clipEndRef.current = null;
    setSpeaking(false);
    setPaused(false);
  };
  const startAudio = (target = segment) => {
    if (lesson.media) {
      const video = videoRef.current;
      if (!video) return;
      clipEndRef.current = null;
      if (video.ended || video.currentTime >= (video.duration || lesson.media.duration) - .2) video.currentTime = 0;
      video.playbackRate = rate;
      video.volume = volume;
      void video.play().then(() => { setSpeaking(true); setPaused(false); }).catch(() => { setSpeaking(false); setPaused(false); });
      return;
    }
    if (!("speechSynthesis" in window)) return;
    const text = fillScript(lesson, target === "all" ? undefined : Number(target));
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB"; utterance.rate = rate; utterance.pitch = 1;
    utterance.onend = () => { setSpeaking(false); setPaused(false); };
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance); setSpeaking(true); setPaused(false);
  };
  const chooseSegment = (target: string) => { stopAudio(); setSegment(target); setTimeout(() => startAudio(target), 50); };
  const togglePause = () => {
    if (lesson.media) {
      const video = videoRef.current;
      if (!video) return;
      if (video.paused) void video.play().then(() => { setSpeaking(true); setPaused(false); });
      else { video.pause(); setSpeaking(false); setPaused(true); }
      return;
    }
    if (!("speechSynthesis" in window)) return;
    if (!speaking) { startAudio(); return; }
    if (paused) { window.speechSynthesis.resume(); setPaused(false); }
    else { window.speechSynthesis.pause(); setPaused(true); }
  };
  const changeLesson = (index: number) => { stopAudio(); setLessonIndex(index); setSubmitted(false); setSubmittedScores(null); setRecordStatus("idle"); setSegment("all"); setParaChoices(Array(10).fill(-1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const speakPhrase = (text: string, start?: number, end?: number) => {
    stopAudio();
    if (lesson.media && start !== undefined) {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, start - .2);
      clipEndRef.current = end ?? start + 6;
      void video.play().then(() => { setSpeaking(true); setPaused(false); });
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text); utterance.lang = "en-GB"; utterance.rate = .82; window.speechSynthesis.speak(utterance);
  };
  const renderText = (text: string) => text.split(/(\[\d+\])/g).map((part, index) => {
    const match = part.match(/\[(\d+)\]/); if (!match) return <span key={index}>{part}</span>;
    const answerIndex = Number(match[1]) - 1; const correct = norm(currentValues[answerIndex]) === norm(lesson.answers[answerIndex]);
    return <span className="blank-wrap" key={index}><span className="blank-number">{match[1]}</span><input disabled={submitted} aria-label={`Answer ${match[1]}`} className={submitted ? (correct ? "correct" : "wrong") : ""} value={currentValues[answerIndex]} onChange={e => { const all = values.map(row => [...row]); all[lessonIndex][answerIndex] = e.target.value; setValues(all); }} />{submitted && !correct && <small>{lesson.answers[answerIndex]}</small>}</span>;
  });

  return <main>
    <nav><a className="brand" href="#top"><img src={typeof brandLogo === "string" ? brandLogo : brandLogo.src} alt="Ms. Trang Trieu Education"/><b>FIGHTER LISTENING</b></a><div className="nav-meta"><span>ONE DAY · ONE STORY</span><b>GRADE 8–9</b></div></nav>
    <header id="top"><div className="eyebrow">REAL-SOURCE ACADEMIC LISTENING · 4–6 MINUTES</div><h1>One lesson.<br/><em>One clear world.</em></h1><p className="intro">VOA · BBC · real presenters and expert interviews. Mỗi video là một bài nghe độc lập với 25 cụm chính tả, ngôn ngữ học thuật, signposting và paraphrase practice.</p></header>

    <section className={`student-panel ${studentReady ? "ready" : ""}`} aria-label="Student information"><div><span>STUDENT CHECK-IN{accessConfig ? ` · LEVEL ${accessConfig.level} · VIDEO ${accessConfig.week}` : ""}</span><h2>{!accessConfig ? "Liên kết bài học không hợp lệ." : studentReady ? `${studentName} · ${studentClass}` : "Điền đủ thông tin để mở bài nghe."}</h2></div><label>HỌ VÀ TÊN<input disabled={!accessConfig || submitted} value={studentName} onChange={e => { setStudentName(e.target.value); setStudentReady(false); setSubmitted(false); setSubmittedScores(null); setRecordStatus("idle"); }} placeholder="Nhập đầy đủ họ tên" /></label><label>LỚP<select disabled={!accessConfig || submitted} value={studentClass} onChange={e => { setStudentClass(e.target.value); setStudentReady(false); setSubmitted(false); setSubmittedScores(null); setRecordStatus("idle"); }}><option value="">— Chọn lớp FIGHTER —</option>{fighterClasses.map(name => <option value={name} key={name}>{name}</option>)}</select></label><button className="start-week" disabled={!accessConfig || !studentName.trim() || !studentClass || submitted} onClick={openLesson}>{submitted ? "✓ LƯỢT NÀY ĐÃ NỘP" : studentReady ? "✓ BÀI ĐÃ MỞ" : `MỞ VIDEO${accessConfig ? ` ${accessConfig.week}` : ""} →`}</button></section>

    {!studentReady && <section className="locked-message"><b>🔒 BÀI NGHE ĐANG KHÓA</b><p>{accessConfig ? "Học sinh cần nhập họ tên và chọn đúng lớp FIGHTER ở trên." : "Vui lòng sử dụng đúng đường link do giáo viên cung cấp."}</p></section>}
    {studentReady && <>
    <section className="lesson-hero"><div><span>{lesson.day} · {lesson.category}</span><h2>{lesson.title}</h2><p>{lesson.kicker}</p></div><strong>{lesson.answers.length}<small>GAPS</small></strong></section>

    {lesson.media ? <section className="real-video-player" aria-label="Real source video player">
      <div className="video-stage" style={{ aspectRatio: lesson.media.aspectRatio || "64 / 31" }}>
        <video
          ref={videoRef}
          preload="none"
          poster={lesson.media.posterSrc}
          playsInline
          onClick={togglePause}
          onLoadedMetadata={event => { const video = event.currentTarget; video.playbackRate = rate; video.volume = volume; setVideoDuration(video.duration || lesson.media!.duration); }}
          onTimeUpdate={event => { const video = event.currentTarget; setVideoTime(video.currentTime); if (clipEndRef.current !== null && video.currentTime >= clipEndRef.current) { video.pause(); clipEndRef.current = null; setSpeaking(false); setPaused(false); } }}
          onPlay={() => { setSpeaking(true); setPaused(false); }}
          onPause={() => setSpeaking(false)}
          onEnded={() => { clipEndRef.current = null; setSpeaking(false); setPaused(false); }}
        ><source src={lesson.media.videoSrc} type="video/mp4" /></video>
        <button className="video-main-button" onClick={togglePause}>{speaking && !paused ? "Ⅱ" : "▶"}<span>{speaking && !paused ? "PAUSE" : paused ? "CONTINUE" : "PLAY VIDEO"}</span></button>
      </div>
      <div className="video-controls">
        <button onClick={() => { const video = videoRef.current; if (video) { video.currentTime = 0; setVideoTime(0); } startAudio("all"); }}>↺ REPLAY</button>
        <label className="video-progress"><span>{formatTime(videoTime)}</span><input aria-label="Video position" type="range" min="0" max={videoDuration || lesson.media.duration} step="0.1" value={Math.min(videoTime, videoDuration || lesson.media.duration)} onChange={event => { const video = videoRef.current; const next = Number(event.target.value); clipEndRef.current = null; if (video) video.currentTime = next; setVideoTime(next); }} /><span>{formatTime(videoDuration || lesson.media.duration)}</span></label>
        <label className="video-speed">SPEED<select value={rate} onChange={event => { const next = Number(event.target.value); setRate(next); if (videoRef.current) videoRef.current.playbackRate = next; }}><option value="0.8">0.8×</option><option value="0.9">0.9×</option><option value="1">1.0×</option></select></label>
        <label className="video-volume">VOL<input aria-label="Volume" type="range" min="0" max="1" step="0.05" value={volume} onChange={event => { const next = Number(event.target.value); setVolume(next); if (videoRef.current) videoRef.current.volume = next; }} /></label>
      </div>
      <div className="source-credit"><b>REAL HUMAN SOURCE</b><span>{lesson.media.credit}</span><small>Nghe bằng tai và điền trực tiếp vào transcript bên dưới.</small></div>
    </section> : <section className="listening-console" aria-label="Audio controls"><div className="console-heading"><div><span>CHOOSE WHAT TO HEAR</span><h3>{segment === "all" ? "Full report" : `Part ${Number(segment) + 1} of 4`}</h3></div><label>SPEED<select value={rate} onChange={e => { stopAudio(); setRate(Number(e.target.value)); }}><option value="0.78">0.8×</option><option value="0.9">0.9×</option><option value="1">1.0×</option></select></label></div><div className="segment-buttons"><button className={segment === "all" ? "active" : ""} onClick={() => chooseSegment("all")}>▶ FULL AUDIO</button>{lesson.paragraphs.map((_, i) => <button className={segment === String(i) ? "active" : ""} onClick={() => chooseSegment(String(i))} key={i}>▶ PART {i + 1}</button>)}</div><div className="transport"><button className="pause" onClick={togglePause}>{!speaking ? "▶ START LISTENING" : paused ? "▶ RESUME" : "Ⅱ PAUSE"}</button><button onClick={() => startAudio()}>↺ REPLAY SELECTED PART</button><span>{speaking ? paused ? "PAUSED" : "NOW PLAYING" : "READY"}</span></div></section>}

    <div className="instructions"><b>DICTATION MISSION</b><p>{lesson.media ? "Xem video liền mạch và điền trực tiếp 25 cụm từ còn thiếu vào transcript bên dưới. Có thể tua và nghe lại không giới hạn." : "Nghe toàn bài trước. Sau đó chọn từng Part để chép chính xác 25 cụm từ. Có thể nghe lại không giới hạn."}</p><span>25 POINTS</span></div>

    <section className="worksheet"><div className="worksheet-head"><span>{lesson.media ? "VIDEO TRANSCRIPT" : "FULL DICTATION"}</span><h2>Write exactly what you hear.</h2><p>Spelling, word forms, apostrophes and numbers all matter.</p></div>{lesson.paragraphs.map((text, i) => <article key={i}><div className="part-label"><b>{lesson.media ? `TRANSCRIPT · ${String(i + 1).padStart(2, "0")}` : `PART ${i + 1}`}</b>{!lesson.media && <button onClick={() => chooseSegment(String(i))}>▶ PLAY PART {i + 1}</button>}</div><p>{renderText(text)}</p></article>)}</section>

    <section className="finish"><div><span>{listeningFilled}/25 COMPLETED</span><h2>Complete all 25 listening answers.</h2><p>{listeningComplete ? "Phần nghe đã hoàn thành. Tiếp tục làm đủ 10 câu paraphrase rồi nộp bài một lần ở cuối trang." : "Điền đủ 25 ô để hoàn thành phần nghe."}</p></div></section>
    {submitted && <section className="results" aria-live="polite"><div className="score">{score}<small>/25</small></div><div><span>LISTENING SCORE · FINAL</span><h2>{score === 25 ? "Flawless listening." : score >= 20 ? "Strong work, fighter." : "Review. Notice. Learn."}</h2><p>Điểm đã được khóa. Các câu sai hiện đáp án chính xác để học sinh nghe lại và tự chữa bài.</p></div></section>}
    {submitted && lesson.media && <section className="transcript-review"><div><span>FULL TRANSCRIPT · AFTER SUBMISSION</span><h2>Read, replay and notice.</h2><p>Transcript đầy đủ chỉ mở sau khi học sinh đã nộp bài.</p></div>{lesson.paragraphs.map((_, index) => <p key={index}><b>{String(index + 1).padStart(2, "0")}</b>{fillScript(lesson, index)}</p>)}</section>}
    {submitted && <section className="vocabulary-review"><div className="vocabulary-heading"><span>VOCABULARY REVIEW · LEVEL {accessConfig?.level} · VIDEO {accessConfig?.week}</span><h2>Understand the answer, not only the spelling.</h2><p>Các từ và cụm từ đáng học trong bài nghe này.</p></div><div className="vocabulary-grid">{lessonVocabulary[lessonIndex].map(item => <article key={item.term}><h3>{item.term}</h3><b>{item.meaning}</b><p>{item.note}</p></article>)}</div></section>}

    <section className="academic"><div className="academic-number">02</div><div className="academic-main"><span>PARAPHRASE PRACTICE · {academicBridge[lessonIndex].code}</span><h2>Same idea, different words.</h2><div className="academic-banner"><b>{academicBridge[lessonIndex].style}</b><p>{academicBridge[lessonIndex].focus}</p></div><div className="practice-steps"><span><b>1</b> HEAR & LOCATE</span><span><b>2</b> MATCH A–J</span><span><b>3</b> ONE SCORE / ATTEMPT</span></div><div className="match-bank"><h3>MEANING BANK · A–J</h3><div>{paraphraseOrder.map((sourceIndex, bankIndex) => <p key={sourceIndex}><b>{String.fromCharCode(65 + bankIndex)}</b>{academicBridge[lessonIndex].paraphrases[sourceIndex][1]}</p>)}</div></div><div className="matching-grid">{academicBridge[lessonIndex].paraphrases.map((pair, question) => { const correctChoice = paraphraseOrder.indexOf(question); const isCorrect = paraChoices[question] === correctChoice; return <article className={submitted ? isCorrect ? "match-correct" : "match-wrong" : ""} key={pair[0]}><span className="match-number">{String(question + 1).padStart(2, "0")}</span><div className="match-source"><small>PHRASE FROM THE LISTENING</small><h3>{pair[0]}</h3>{submitted && <div className="technique"><b>HOW IT CHANGED</b>{pair[2]}</div>}</div><button className="hear-small" onClick={() => speakPhrase(pair[0], pair[3], pair[4])}>▶ HEAR</button><label><span>MATCH</span><select disabled={submitted} aria-label={`Match phrase ${question + 1}`} value={paraChoices[question]} onChange={e => { const next = [...paraChoices]; next[question] = Number(e.target.value); setParaChoices(next); }}><option value={-1}>— Chọn đáp án —</option>{paraphraseOrder.map((sourceIndex, bankIndex) => <option value={bankIndex} key={bankIndex}>{String.fromCharCode(65 + bankIndex)} · {academicBridge[lessonIndex].paraphrases[sourceIndex][1]}</option>)}</select></label></article>})}</div><div className="para-check"><button disabled={submitted || !listeningComplete || !paraphraseComplete || recordStatus === "saving"} onClick={submitAttempt}>{submitted ? "✓ LƯỢT NÀY ĐÃ NỘP · ĐIỂM ĐÃ KHÓA" : recordStatus === "saving" ? "ĐANG GHI ĐIỂM…" : "NỘP BÀI & XEM ĐÁP ÁN →"}</button>{submitted && <strong>{paraScore}/10 CORRECT</strong>}<span className="record-note">{recordStatus === "saved" ? "✓ Điểm lượt này đã được ghi tự động." : recordStatus === "error" ? "Bài đã được giữ lại và hệ thống đang tự gửi lại điểm." : submitted ? "Đang ghi điểm tự động…" : !listeningComplete || !paraphraseComplete ? "Hoàn thành đủ 25 câu nghe và 10 câu paraphrase để nộp." : "Mỗi lượt làm chỉ được nộp một lần."}</span></div>{submitted && <div className="combined-score" aria-live="polite"><div><span>LISTENING · LƯỢT NÀY</span><b>{score}<small>/25</small></b></div><div><span>PARAPHRASE · LƯỢT NÀY</span><b>{paraScore}<small>/10</small></b></div><div className="total"><span>TOTAL · LƯỢT NÀY</span><b>{score + paraScore}<small>/35</small></b></div><p>Muốn làm lượt mới, hãy thoát hẳn trang rồi mở lại đường link bài tập.</p></div>}<div className="signal-strip"><h3>Structure signals from this talk</h3>{academicBridge[lessonIndex].signals.map((x, i) => <span key={x}><b>0{i + 1}</b>{x}</span>)}</div></div></section>

    </>}
    <footer><b>FIGHTER LISTENING</b><span>ONE DAY · ONE TOPIC · LISTEN & PARAPHRASE</span><span>For Grade 8–9 English specialists</span></footer>
  </main>;
}
