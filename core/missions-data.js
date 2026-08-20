/**
 * Mission content lives separately from game logic.
 * To add a mission later, copy one mission object and update its questions.
 *
 * Question format:
 * question, option labels, option images, option hints,
 * correct option index, correct-answer feedback.
 */

export const missions = {
  password: {
    title: "Password Shield",
    intro: "Choose the strongest password.",
    questions: [
      [
        "Which password is strongest?",
        ["123456", "MyName", "G7!pQ2#xL"],
        [
          "assets/cards/weak-password.png",
          "assets/cards/name-password.png",
          "assets/cards/shield-lock.png",
        ],
        ["Too easy", "Not strong enough", "Best choice"],
        2,
        "Correct! Strong passwords are long and unique.",
      ],
      [
        "What should you do with your password?",
        ["Share it with friends", "Keep it private", "Post it online"],
        [
          "assets/cards/share-password.png",
          "assets/cards/private-lock.png",
          "assets/cards/post-online.png",
        ],
        ["Unsafe", "Safe choice", "Unsafe"],
        1,
        "Correct! Keep passwords private.",
      ],
      [
        "What helps make a password safer?",
        ["Using a name", "One word only", "Letters, numbers, and symbols"],
        [
          "assets/cards/name-password.png",
          "assets/cards/one-word.png",
          "assets/cards/password-keys.png",
        ],
        ["Not strong", "Too simple", "Stronger"],
        2,
        "Correct! Mix letters, numbers, and symbols.",
      ],
    ],
  },

  link: {
    title: "Safe Link Patrol",
    intro: "Spot suspicious messages.",
    questions: [
      [
        "Which message looks safest?",
        ["You won a prize!", "Your teacher shared homework.", "Open this urgently!"],
        [
          "assets/cards/prize-scam.png",
          "assets/cards/homework-link.png",
          "assets/cards/urgent-warning.png",
        ],
        ["Scam", "Safe", "Scam"],
        1,
        "Correct! Familiar links are safer.",
      ],
      [
        "What should you do with a strange link?",
        ["Click quickly", "Ask a trusted adult", "Send it to everyone"],
        [
          "assets/cards/click-fast.png",
          "assets/cards/ask-adult.png",
          "assets/cards/share-link.png",
        ],
        ["Unsafe", "Safe", "Unsafe"],
        1,
        "Correct! Ask an adult first.",
      ],
      [
        "Which sign can mean a scam?",
        ["Calm school message", "Urgent pressure", "Trusted teacher"],
        [
          "assets/cards/calm-school.png",
          "assets/cards/urgent-warning.png",
          "assets/cards/trusted-teacher.png",
        ],
        ["Safe", "Scam clue", "Safe"],
        1,
        "Correct! Urgency can be a scam clue.",
      ],
    ],
  },

  privacy: {
    title: "Privacy Quest",
    intro: "Learn what should stay private.",
    questions: [
      [
        "What should you keep private?",
        ["Favourite colour", "Home address", "Favourite game"],
        [
          "assets/cards/color.png",
          "assets/cards/home-address.png",
          "assets/cards/gamepad.png",
        ],
        ["Fine", "Private", "Fine"],
        1,
        "Correct! Your address is private.",
      ],
      [
        "What is safe to share online?",
        ["School password", "Full address", "A drawing"],
        [
          "assets/cards/password.png",
          "assets/cards/address.png",
          "assets/cards/drawing.png",
        ],
        ["Unsafe", "Unsafe", "Safe"],
        2,
        "Correct! A drawing is safer.",
      ],
      [
        "A website asks for too much information. What should you do?",
        ["Enter everything", "Close it and tell an adult", "Ignore it"],
        [
          "assets/cards/enter-all.png",
          "assets/cards/tell-adult.png",
          "assets/cards/ignore-warning.png",
        ],
        ["Unsafe", "Safe", "Unsafe"],
        1,
        "Correct! Close it and ask an adult.",
      ],
    ],
  },

  kindness: {
    title: "Kindness Defender",
    intro: "Respond safely when someone is mean online.",
    questions: [
      [
        "What should you do if someone is mean online?",
        ["Insult them", "Tell a trusted adult", "Share it everywhere"],
        [
          "assets/cards/mean-reply.png",
          "assets/cards/tell-adult.png",
          "assets/cards/share-bully.png",
        ],
        ["Unsafe", "Safe", "Unsafe"],
        1,
        "Correct! Tell a trusted adult.",
      ],
      [
        "What is good online behaviour?",
        ["Being kind", "Spreading rumours", "Making others upset"],
        [
          "assets/cards/kind-heart.png",
          "assets/cards/rumour.png",
          "assets/cards/upset-face.png",
        ],
        ["Best", "Unsafe", "Unsafe"],
        0,
        "Correct! Kindness helps everyone.",
      ],
      [
        "A message makes you uncomfortable. What should you do?",
        ["Keep it secret", "Block/report and tell an adult", "Reply angrily"],
        [
          "assets/cards/secret.png",
          "assets/cards/report-flag.png",
          "assets/cards/angry-reply.png",
        ],
        ["Unsafe", "Safe", "Unsafe"],
        1,
        "Correct! Block, report, and tell an adult.",
      ],
    ],
  },
};