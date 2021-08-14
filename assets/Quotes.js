import * as categories from "./categories.js";

const Quotes = {
  motivation: [
    {
      from: "Harvey Specter",
      quote: "I don't get lucky, I make my own luck.",
      key: "1",
    },
    {
      from: "Harvey Specter",
      quote:
        "When you're backed against the wall, break that goddamn thing down.",
      key: "2",
    },
    {
      from: "Harvey Specter",
      quote:
        "In school you're given the lesson then the test. In life you're given the test then the lesson.",
      key: "3",
    },
    {
      from: "Jessica Pearson",
      quote:
        "First thing to do when you find yourself in trouble is admit to yourself what you did to get yourself there.",
      key: "4",
    },
    {
      from: "Harvey Specter",
      quote: "Get your shit together.",
      key: "5",
    },
    {
      from: "Harvey Specter",
      quote:
        "Never kick me when I am down because when I get back up... you're fucked.",
      key: "6",
    },
    {
      from: "Harvey Specter",
      quote:
        "I quit every goddamn day but I never said it out loud. No way was I gonna give them the satisfaction of breaking me. ",
      key: "7",
    },
    {
      from: "Harvey Specter",
      quote:
        "That's the difference between you and me. You wanna loose small. I wanna win big.",
      key: "8",
    },
    {
      from: "Harvey Specter",
      quote: "Stop making excuses for everything you want in life.",
      key: "9",
    },
    {
      from: "Harvey Specter",
      quote:
        "The beginning of your success is at the end of your comfort zone.",
      key: "10",
    },
    {
      from: "Harvey Specter",
      quote: "Winners always find a way to win.",
      key: "11",
    },
    {
      from: "Michael Jordan",
      quote: "If you quit ONCE it becomes a habit. Never quit.",
      key: "12",
    },
    {
      from: "Michael Jordan",
      quote: "You have to expect things of yourself before you can do them.",
      key: "13",
    },
    {
      from: "Michael Jordan",
      quote:
        "I can accept failure, everyone fails at something. But I can't accept not trying.",
      key: "14",
    },
    {
      from: "Michael Jordan",
      quote:
        "Some people want it to happen, some wish it would happen, others make it happen.",
      key: "15",
    },
    {
      from: "Michael Jordan",
      quote: "Jeder hat Talent, aber Fähigkeit erfordert harte Arbeit. ",
      key: "16",
    },
  ],
  inspiration: [
    {
      from: "Winston Churchill",
      quote:
        "The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.",
      key: "1000",
    },
    {
      from: "Walt Disney",
      quote: "The Best Way To Get Started Is To Quit Talking And Begin Doing.",
      key: "1001",
    },

    {
      from: "Will Rogers",
      quote: "Don’t Let Yesterday Take Up Too Much Of Today.",
      key: "1002",
    },
    {
      from: "Unknown",
      quote:
        "You Learn More From Failure Than From Success. Don’t Let It Stop You. Failure Builds Character.",
      key: "1003",
    },
    {
      from: "Vince Lombardi",
      quote: "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.",
      key: "1004",
    },
    {
      from: "Steve Jobs",
      quote:
        "If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You.",
      key: "1005",
    },
    {
      from: "Rob Siltanen",
      quote:
        "People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.",
      key: "1006",
    },
    {
      from: "Maya Angelou",
      quote: "We May Encounter Many Defeats But We Must Not Be Defeated.",
      key: "1007",
    },
    {
      from: "Johann Wolfgang Von Goethe",
      quote:
        "Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do.",
      key: "1008",
    },
    {
      quote:
        "Imagine Your Life Is Perfect In Every Respect; What Would It Look Like?",
      from: "Brian Tracy",
      key: "1009",
    },
    {
      from: "Henry Ford",
      quote: "Whether You Think You Can Or Think You Can’t, You’re Right.",
      key: "1010",
    },
    {
      from: "Helen Keller",
      quote:
        "Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing.",
      key: "1011",
    },
    {
      from: "Franklin D. Roosevelt",
      quote:
        "The Only Limit To Our Realization Of Tomorrow Will Be Our Doubts Of Today.",
      key: "1012",
    },
    {
      from: "Albert Einstein",
      quote: "Creativity Is Intelligence Having Fun.",
      key: "1013",
    },
    {
      from: "Brian Tracy",
      quote:
        "Fake It Until You Make It! Act As If You Had All The Confidence You Require Until It Becomes Your Reality.",
      key: "1014",
    },
    {
      from: "Steve Jobs",
      quote:
        "The Only Way To Do Great Work Is To Love What You Do. If You Haven’t Found It Yet, Keep Looking. Don’t Settle.",
      key: "1015",
    },
    {
      from: "Zig Ziglar",
      quote:
        "You Don’t Have To Be Great To Start, But You Have To Start To Be Great.",
      key: "1016",
    },
    {
      from: "Winston Churchill",
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      key: "1017",
    },
    {
      from: "Helen Keller",
      quote:
        "Never bend your head. Always hold it high. Look the world straight in the eye.",
      key: "1018",
    },
    {
      from: "Theodore Roosevelt",
      quote: "Believe you can and you're halfway there.",
      key: "1019",
    },
    {
      from: "Albert Einstein",
      quote:
        "Life is like riding a bicycle. To keep your balance, you must keep moving.",
      key: "1020",
    },
  ],
  classic: [
    {
      from: "Nelson Mandela",
      quote:
        "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      key: "2000",
    },
    {
      from: "Eleanor Roosevelt",
      quote:
        "If life were predictable it would cease to be life, and be without flavor.",
      key: "2001",
    },
    {
      from: "Oprah Winfrey",
      quote:
        "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
      key: "2002",
    },
    {
      from: "James Cameron",
      quote:
        "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
      key: "2003",
    },
    {
      from: "Mother Teresa",
      quote:
        "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
      key: "2004",
    },
    {
      from: "Franklin D. Roosevelt",
      quote:
        "When you reach the end of your rope, tie a knot in it and hang on.",
      key: "2005",
    },
    {
      from: "Benjamin Franklin",
      quote:
        "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
      key: "2006",
    },
    {
      from: "Helen Keller",
      quote:
        "The best and most beautiful things in the world cannot be seen or even touched — they must be felt with the heart.",
      key: "2007",
    },
    {
      from: "Aristotle",
      quote:
        "It is during our darkest moments that we must focus to see the light.",
      key: "2008",
    },
    {
      from: "Anne Frank",
      quote: "Whoever is happy will make others happy too.",
      key: "2009",
    },
  ],
};

export default Quotes;
