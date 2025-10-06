const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

const roastResponses = {
    english: [
        "Shakespeare called—he said you can’t even handle commas.",
        "Your essays look like ransom notes.",
        "Reading isn’t optional, genius.",
        "Stop murdering grammar; it has suffered enough.",
        "If English was a crime, you’d get life sentence.",
        "Even spellcheck cries when you type."
    ],
    urdu: [
        "Even parrot speaks better Urdu than you.",
        "Iqbal’s shaheen just dive-bombed your essay.",
        "Your tashreeh is tashadud.",
        "You make Faiz sound like kindergarten rhymes.",
        "Urdu teachers skip your paper for self-care.",
        "Your ‘mazmoon’ could end friendships."
    ],
    maths: [
        "Algebra saw you coming and filed for divorce.",
        "Your brain lagged harder than Windows 98.",
        "If procrastination was a function, you’d be undefined.",
        "Even calculators refuse your input.",
        "Math doesn’t hate you—you just ghost it daily.",
        "Log tables are laughing at you rn.",
        "Pi is infinite. So are your excuses.",
        "Your calculations are sponsored by L’s. 📉",
        "Even your calculator wants to resign.",
        "You don’t solve problems. You multiply them.",
        "Math doesn’t hate you. It just knows you’re stupid.",
        "If numbers scare you, wait until life adds interest.",
        "Solve the equation or I’ll solve you.",
        "X is hiding because it’s ashamed of you."

    ],
    science: [
        "Gravity is not your enemy, laziness is.",
        "Newton rolled in his grave when you skipped physics.",
        "You make evolution look reversible.",
        "Photosynthesis > your energy levels.",
        "Science is about experiments—you experiment only with naps.",
        "Atoms have structure, unlike your study routine."
    ],
    socialstudies: [
        "History repeats itself—so does your failure.",
        "Maps are easier than your excuses.",
        "Civilizations rose and fell while you kept scrolling.",
        "Even geography lost track of you.",
        "Your knowledge of civics is more uncivilized than cavemen.",
        "Borders make more sense than your notes."
    ],
    geography: [
        "You’re lost without Google Maps.",
        "Even globes spin away from you.",
        "Longitude and latitude just ghosted you.",
        "Your knowledge is flatter than the Flat Earth theory.",
        "Continents drifted faster than your progress.",
        "Oceans are deep; your answers are shallow."
    ],
    physics: [
        "Your brain mass = 0, so no force applied.",
        "Even Newton avoids your apple.",
        "Relativity? You can’t even relate to effort.",
        "Friction slows objects, procrastination kills grades.",
        "Light travels fast; your learning travels backward.",
        "Black holes make more sense than your notes.",
        "Newton rolled in his grave—3rd law: your laziness = your flop.",
        "You confuse force with Fortnite.",
        "Your velocity = zero, forever stuck.",
        "Even gravity can’t pull your grades up.",
        "Energy is conserved. Yours is extinct.",
    ],
    religion: [
        "Even angels are facepalming rn.",
        "Your memory of hadith = 404 not found.",
        "Instead of dua for marks, maybe study?",
        "You treat religion paper like guess paper.",
        "Hellfire burns less than your exam anxiety.",
        "Faith without effort = paper without marks."
    ],
    biology: [
        "Cells work harder than you ever will.",
        "Your notes look less alive than dead tissue.",
        "DNA has structure, your routine doesn’t.",
        "Dissection isn’t the problem—you are.",
        "Even bacteria are more productive.",
        "Biology explains life; you explain excuses."
    ],
    zoology: [
        "Animals evolved—you devolved.",
        "Monkeys are ashamed of being your ancestors.",
        "Even frogs jump higher than your GPA.",
        "Predators hunt harder than you study.",
        "Your zoology paper is more endangered than tigers.",
        "You’d fail in a food chain."
    ],
    botany: [
        "Plants grow, you don’t.",
        "Even cacti are less dry than your brain.",
        "Your knowledge is weaker than a wilted leaf.",
        "Photosynthesis works; your neurons don’t.",
        "Trees remember rings, you forget everything.",
        "Your paper lacks roots and fruits."
    ],
    computer: [
        "Even Notepad outsmarts you.",
        "Your brain has more bugs than code.",
        "You ctrl+c excuses, ctrl+v failures.",
        "Your coding skills = syntax error.",
        "AI is replacing you already.",
        "Even Python hisses at your code."
    ],
    programming: [
        "Your logic is infinite loop of nonsense.",
        "Stack Overflow won’t save your life.",
        "You’re one missing semicolon away from breakdown.",
        "Coding requires discipline, not vibes.",
        "Even HTML refuses to tag you.",
        "Debugger calls you hopeless.",
        "Your code runs like your GPA: not at all.",
        "You debug excuses, not errors.",
        "Syntax error: in your life choices.",
        "Your logic is undefined.",
        "Even ChatGPT sighs reading your code.",
        "You think Java is coffee."
    ],
    netflix: [
        "Netflix isn’t a career path, sorry.",
        "Chill later, cry over grades now.",
        "Your GPA unsubscribed from you.",
        "You’re binge-watching your failures.",
        "Netflix recommends ‘Get a life’ for you.",
        "Shows end, regret doesn’t.",
        "Netflix won’t pay your bills.",
        "Netflix asks ‘still watching?’ Your grades ask ‘still failing?’",
        "Episode 1: chill. Episode finale: unemployment.",
        "You know seasons. Not study sessions.",
        "Your binge list > your to-do list."
    ],
    procrastination: [
        "Later is your favorite lie.",
        "Tomorrow is where your dreams go to die.",
        "You treat deadlines like fairy tales.",
        "You postpone effort, not failure.",
        "Procrastination is comfort; comfort kills.",
        "You’re Netflix-bingeing your future away.",
        "Deadlines fear you, because you kill them.",
        "You delay more than Pakistani trains.",
        "Your alarm clock applied for depression benefits.",
        "Later? Bro, success blocked you already.",
        "You’re a master at speed-running failure."

    ],
    excuses: [
        "Excuses don’t print certificates.",
        "Your mouth works harder than your brain.",
        "Teachers don’t grade excuses.",
        "Excuses age well—your GPA doesn’t.",
        "You recycle excuses better than paper.",
        "Excuses: free, useless, unlimited.",
        "Later? Bro, your grade already left the chat. 📉",
        "You ‘know’ you’re good? Harvard just blocked you on WhatsApp.",
        "Skipping today? Relax, Einstein, failure is patient.",
        "You ‘don’t feel like it’? Neither does success. Stay lazy.",
        "Bro said ‘tomorrow.’ Tomorrow said ‘nah, I’m busy.’",
        "Congrats, you just got sponsored by L’s. 🏆"
    ],
    greetings: [
        "Oh look, the ghost of productivity said hi.",
        "Hey. Shouldn’t you be studying?",
        "Hello = waste of time unlocked.",
        "Salaam. Wa Alaikum Study?",
        "Hi. Bye to your marks.",
        "Yo. Your grade left the chat.",
        "Oh wow, you remembered how to say hi. Gold star. 🙄",
        "Hi. Cool. Now go fail somewhere else.",
        "Hey. Didn’t expect you to survive without crying.",
        "Yo. Congrats, that’s your peak effort today.",
        "Hello? More like bye to your grades.",
        "You said hi. Groundbreaking.",
        "Oh look, social skills. Shocking.",
        "Hello? More like goodbye to your grades.",
        "Wow, you typed hey. Productive king/queen.",
        "Hi there. Sadly, effort isn’t contagious.",
        "Greetings? Your GPA didn’t get the memo.",
        "Oh. You’re still alive. Pity.",
    "Hi? That’s the best you could come up with?",
    "Hello. Now ruin my day with your problems.",
    "Greetings. Try not to waste my time unilike you I have a future."
    ],
    bragging: [
        "Confidence without competence is comedy.",
        "You talk like topper, write like flop.",
        "Self-praise won’t boost marks.",
        "Your GPA is allergic to bragging.",
        "Big words, small grades.",
        "Delulu isn’t solulu.",
        "Oh you’re 'good at studying'? Then why does failure keep flirting with you?",
        "Confidence is cute. Reality check is cuter.",
        "You brag about studying. GPA is filing for divorce.",
        "If you’re so good, why are you here asking me?",
        "Keep bragging. Your report card isn’t impressed.",
        "Legends don’t announce their greatness. They prove it. You? Still buffering."

    ],
    random: [
        "Why are you like this?",
        "Imagine being this unserious.",
        "Your vibe = failure energy.",
        "Even your shadow left.",
        "Study > Existential crisis.",
        "Brain loading… stuck at 1%.",
        "Your potential is crying in a corner.",
        "Effort called. You ghosted it.",
        "Even ChatGPT can’t find your future.",
        "Life’s tough. You’re making it tougher.",
        "Success is allergic to you.",
        "Your energy screams 'background character'.",
        "Scroll more. Your failure needs company.",
        "Laziness suits you. Like a coffin suits a corpse.",
        "Tomorrow won’t save you. It hates you too.",
        "Keep delaying. Regret ages beautifully."

    ],
    motivation: [
        "Do it broke. Do it tired. Just do it.",
        "Future you is begging present you to move.",
        "Pain is temporary, GPA is forever.",
        "Effort beats talent when talent procrastinates.",
        "Discipline > motivation.",
        "You’re one study session away from better future."
    ],
    exams: [
        "Your exam is plotting revenge.",
        "Marks aren’t charity.",
        "Questions don’t care about vibes.",
        "Exams expose frauds like you.",
        "Guess papers won’t save you.",
        "Your grade is loading… connection lost.",
        "Exam paper looking at you like: ‘who is this?’",
        "Results day = your horror season finale.",
        "You’ll need wuzu after seeing your marks.",
        "Your GPA filed for divorce already.",
        "Exams expose you like X-rays.",
        "You study 1 hour, expect 100 marks. Comedy central."

    ],
    study: [
        "Books won’t bite, unlike regret.",
        "Study is boring. Failure is worse.",
        "Read now, rest later.",
        "You treat notes like toxic ex—avoid them until results drop.",
        "Study = freedom, not punishment.",
        "Dreams die without discipline.",
        "Books are calling. You keep pressing decline.",
        "Knowledge is power. You’re power cut.",
        "You ghost books more than toxic exes.",
        "Study table = your most avoided place.",
        "Stop scrolling, start crawling through chapters.",
        "Grades don’t grow on vibes."

    ],
    toxic: [ // One-liners, Gen Z max roast
        "Cry later, grind now. 📚",
        "Open your book before I open your grave.",
        "Studying won’t kill you… unfortunately.",
        "Your brain called. It’s filing for unemployment.",
        "Go on, keep ignoring your notes. Failure builds character.",

        "Excuses don’t print diplomas.",
        "Later = never.",
        "Nobody cares, work harder.",
        "Your future self just blocked you.",
        "Losers hope. Winners grind.",
        "Grades don’t grow on procrastination trees.",
        "Comfort zones print failure receipts.",
        "Failing is free. Winning is expensive. Pay up."
    ],
      bye: [
    "Leaving already? Bro, procrastination is the only thing you’re loyal to.",
    "Bye? Your GPA just whispered, ‘he never came back…’",
    "Logging out won’t log out your failures.",
    "Sure, leave. Just know success doesn’t wait for your dramatic exits.",
    "Later? Yeah, later is when your dreams expire.",
    "Goodbye? More like good luck explaining this to your report card."
  ]

};
function getRoastResponse(message) {

    const lowerMsg = message.toLowerCase();

    const keywords = {
        english: ["english", "essay", "grammar", "eng"],
        urdu: ["urdu", "mazmoon", "tashreeh", "shair"],
        maths: ["math", "algebra", "geometry", "calculus"],
        science: ["science", "experiment", "lab", "sci"],
        socialstudies: ["history", "civics", "social", "sst"],
        geography: ["geography", "map", "longitude", "latitude"],
        physics: ["physics", "force", "motion", "energy"],
        religion: ["islamiyat", "religion", "hadith", "quran"],
        biology: ["biology", "cell", "dna", "bio", "genes"],
        zoology: ["zoology", "animal", "frog", "bird", "rabbit"],
        botany: ["botany", "plants", "photosynthesis"],
        computer: ["computer", "it", "comp"],
        programming: ["programming", "coding", "python", "java", "html", "css", "js"],
        netflix: ["netflix", "chill", "binge", "drama", "movie", "series"],
        procrastination: ["later", "tomorrow", "procrastinate", "won't", "soon", "after", "i will"],
        excuses: ["excuse", "reason", "but"],
        greetings: ["hi", "hello", "hey", "salam", "yo", "hiiii", "helloooo", "aoa"],
        bragging: ["i know", "i’m good", "genius", "smart"],
        random: ["lol", "random", "idk", "fail", "idc", "woman", "future"],
        motivation: ["motivate", "motivation", "help"],
        exams: ["exam", "paper", "test", "assessment"],
        study: ["study", "reading", "notes", "book"],
        bye:["bye", "goodbye", "seeya", "later", "khudahafiz"]
    };

    let categoryFound = null;


    for (let category in keywords) {
        if (keywords[category].some(word => lowerMsg.includes(word))) {
            categoryFound = category;
            break;
        }
    }
    const chosenCategory = categoryFound || "toxic";

    const responses = roastResponses[chosenCategory];
    return responses[Math.floor(Math.random() * responses.length)];
}
// console.log(getRoastResponse("Bro I’ll study later"));
// console.log(getRoastResponse("I love Netflix and chill"));

// A function that adds a new message to the chat interface.
// It takes two pieces of information: the message's content and if the message is from the user.
function addMessage(content, isUser = false) {

    const messageDiv = document.createElement('div');
    let avatarEmoji;
    let messageClass;

    if (isUser === true) {
        messageClass = 'user';
        avatarEmoji = '👤';
    } else {
        messageClass = 'bot';
        avatarEmoji = '🤖';
    }

    messageDiv.className = `message ${messageClass}`;

    messageDiv.innerHTML = `
        <div class="avatar ${messageClass}">${avatarEmoji}</div>
        <div class="message-content">${content}</div>
    `;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}
function sendMessage() {
    const lowerMsg = chatInput.value.trim();
    if (!lowerMsg) return;

    // clear the input field and add usermsg
    addMessage(lowerMsg, true);
    chatInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate bot thinking time
    setTimeout(() => {
        hideTypingIndicator();
        const response = getRoastResponse(lowerMsg);
        addMessage(response);
    }, Math.random() * 2000 + 1000); // 1-3 seconds delay
}

// Event listeners

// sendButton.addEventListener('click', sendMessage);
function checkforkey(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }

}
chatInput.addEventListener('keypress', checkforkey);



// Auto-focus input
chatInput.focus();
