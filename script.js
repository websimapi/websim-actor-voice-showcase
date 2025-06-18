const voices = [
    {
        character: "Old Wizard",
        script: "The ancient prophecy speaks of a hero, one who will wield the Sword of Glimmering Light and banish the shadows from our realm. Are you that hero?",
        file: "wizard.mp3"
    },
    {
        character: "Sassy Robot",
        script: "My calculations indicate a 97.3% probability that your plan will fail spectacularly. But please, proceed. I find your irrational optimism... amusing.",
        file: "robot.mp3"
    },
    {
        character: "Pirate Captain",
        script: "Arrr, me hearties! Hoist the mainsail and ready the cannons! There be treasure on the horizon, and it's got our name written all over it!",
        file: "pirate.mp3"
    },
    {
        character: "Dramatic Queen",
        script: "How dare you speak to me in that tone! I am your queen! Guards, seize this insolent fool at once! Off with their head!",
        file: "queen.mp3"
    },
    {
        character: "Excited Child",
        script: "Wow! A real spaceship! Can we go inside? Please, please, please! I've always wanted to fly to the moon and see the stars up close!",
        file: "child.mp3"
    },
    {
        character: "Hard-boiled Detective",
        script: "The city's a cold, unforgiving place. I was just another gumshoe trying to make a buck when she walked into my office, bringing a storm of trouble with her.",
        file: "detective.mp3"
    },
    {
        character: "Calm Nature Narrator",
        script: "Here, in the heart of the ancient forest, a delicate ecosystem thrives. The sunlight dapples through the canopy, illuminating the silent dance of life and decay on the forest floor.",
        file: "narrator.mp3"
    },
    {
        character: "Valley Girl",
        script: "Oh my god, Becky, you will not believe what just happened. So, like, I was at the mall, and I saw Chad with Tiffany. I am, like, so over him. Whatever.",
        file: "valley_girl.mp3"
    }
];

const voiceList = document.getElementById('voice-list');
let currentAudio = null;
let currentButton = null;

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg> Play`;
const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/></svg> Stop`;

function stopCurrentAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    if (currentButton) {
        currentButton.classList.remove('playing');
        currentButton.innerHTML = playIcon;
        currentButton = null;
    }
}

function playAudio(button, src) {
    const isPlaying = button.classList.contains('playing');

    stopCurrentAudio();

    if (!isPlaying) {
        currentAudio = new Audio(src);
        currentButton = button;

        button.classList.add('playing');
        button.innerHTML = stopIcon;

        currentAudio.play();

        currentAudio.addEventListener('ended', () => {
            stopCurrentAudio();
        });

        currentAudio.addEventListener('error', (e) => {
            console.error("Error playing audio:", e);
            alert("Sorry, there was an error playing this audio file.");
            stopCurrentAudio();
        });
    }
}

voices.forEach(voice => {
    const item = document.createElement('div');
    item.className = 'voice-item';

    const header = document.createElement('div');
    header.className = 'voice-header';

    const title = document.createElement('h2');
    title.textContent = voice.character;

    const playButton = document.createElement('button');
    playButton.className = 'play-button';
    playButton.innerHTML = playIcon;
    playButton.dataset.src = voice.file;

    playButton.addEventListener('click', () => {
        playAudio(playButton, voice.file);
    });

    header.appendChild(title);
    header.appendChild(playButton);

    const script = document.createElement('blockquote');
    script.className = 'script';
    script.textContent = voice.script;

    item.appendChild(header);
    item.appendChild(script);

    voiceList.appendChild(item);
});

