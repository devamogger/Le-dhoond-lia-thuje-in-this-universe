import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/*
=========================================================
OUR UNIVERSE
STAGE 8 — LIVING UNIVERSE

Major systems:
- Devam + Arsh golden stars
- Cyan memory stars
- Bluish background universe
- More realistic star textures
- Memory importance
- Orbital memory motion
- Time evolution
- Timeline scrubbing
- Future probability memories
- Clickable main stars
- Clickable memory stars
- Short cinematic camera focus
- Free OrbitControls
=========================================================
*/


/* =========================================================
   1. SCENE
   ========================================================= */

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x02070d);


/* =========================================================
   2. CAMERA
   ========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        250
    );

camera.position.set(
    0,
    2,
    8
);


/* =========================================================
   3. RENDERER
   ========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: 'high-performance'
    });

renderer.setPixelRatio(1);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.overflow = 'hidden';
document.body.style.background =
    '#02070d';

document.body.appendChild(
    renderer.domElement
);


/* =========================================================
   4. CONTROLS
   ========================================================= */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;
controls.dampingFactor = 0.06;

controls.minDistance = 2;
controls.maxDistance = 90;

controls.rotateSpeed = 0.55;
controls.zoomSpeed = 0.8;
controls.panSpeed = 0.7;

controls.enablePan = true;

controls.target.set(
    0,
    0,
    0
);

controls.update();


/* =========================================================
   5. LIGHTING
   ========================================================= */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        0.8
    )
);


/* =========================================================
   6. REALISTIC STAR TEXTURE GENERATOR
   =========================================================

   These textures are generated locally using Canvas.

   This gives the stars:
   - bright hot core
   - gradual atmospheric glow
   - irregular light falloff
   - softer edges

   No external image assets are required.
========================================================= */

function createStarTexture(
    coreColor,
    glowColor
) {

    const canvas =
        document.createElement(
            'canvas'
        );

    canvas.width = 128;
    canvas.height = 128;

    const ctx =
        canvas.getContext(
            '2d'
        );

    const gradient =
        ctx.createRadialGradient(
            64,
            64,
            1,
            64,
            64,
            64
        );

    gradient.addColorStop(
        0,
        coreColor
    );

    gradient.addColorStop(
        0.05,
        coreColor
    );

    gradient.addColorStop(
        0.12,
        'rgba(255,255,255,0.98)'
    );

    gradient.addColorStop(
        0.25,
        glowColor
    );

    gradient.addColorStop(
        0.50,
        glowColor
    );

    gradient.addColorStop(
        0.72,
        'rgba(100,220,255,0.08)'
    );

    gradient.addColorStop(
        1,
        'rgba(0,0,0,0)'
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        128,
        128
    );


    /*
       Tiny diffraction-like rays.
       Very subtle so it still looks like a star,
       not a lens flare.
    */

    const rayGradient =
        ctx.createLinearGradient(
            0,
            64,
            128,
            64
        );

    rayGradient.addColorStop(
        0,
        'rgba(255,255,255,0)'
    );

    rayGradient.addColorStop(
        0.5,
        'rgba(255,255,255,0.30)'
    );

    rayGradient.addColorStop(
        1,
        'rgba(255,255,255,0)'
    );

    ctx.fillStyle =
        rayGradient;

    ctx.fillRect(
        8,
        62,
        112,
        4
    );


    const verticalGradient =
        ctx.createLinearGradient(
            64,
            0,
            64,
            128
        );

    verticalGradient.addColorStop(
        0,
        'rgba(255,255,255,0)'
    );

    verticalGradient.addColorStop(
        0.5,
        'rgba(255,255,255,0.18)'
    );

    verticalGradient.addColorStop(
        1,
        'rgba(255,255,255,0)'
    );

    ctx.fillStyle =
        verticalGradient;

    ctx.fillRect(
        62,
        8,
        4,
        112
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );

    texture.needsUpdate =
        true;

    return texture;
}


/* =========================================================
   7. STAR TEXTURES
   ========================================================= */

const goldenStarTexture =
    createStarTexture(
        'rgba(255,255,225,1)',
        'rgba(255,210,70,0.55)'
    );


const cyanStarTexture =
    createStarTexture(
        'rgba(255,255,255,1)',
        'rgba(80,220,255,0.52)'
    );


/* =========================================================
   8. BACKGROUND UNIVERSE
   ========================================================= */

const backgroundStarCount =
    450;

const backgroundPositions =
    new Float32Array(
        backgroundStarCount * 3
    );

for (
    let i = 0;
    i < backgroundStarCount;
    i++
) {

    const i3 =
        i * 3;

    backgroundPositions[i3] =
        (Math.random() - 0.5) * 80;

    backgroundPositions[i3 + 1] =
        (Math.random() - 0.5) * 58;

    backgroundPositions[i3 + 2] =
        (Math.random() - 0.5) * 80;
}


const backgroundGeometry =
    new THREE.BufferGeometry();

backgroundGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
        backgroundPositions,
        3
    )
);


const backgroundMaterial =
    new THREE.PointsMaterial({

        color: 0x8fc9df,

        size: 0.075,

        transparent: true,

        opacity: 0.70,

        depthWrite: false,

        sizeAttenuation: true

    });


const backgroundStars =
    new THREE.Points(
        backgroundGeometry,
        backgroundMaterial
    );

scene.add(
    backgroundStars
);


/* =========================================================
   9. SUBTLE BLUE COSMIC ATMOSPHERE
   ========================================================= */

const hazeGeometry =
    new THREE.SphereGeometry(
        1,
        16,
        16
    );


const hazeMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x16435a,

        transparent: true,

        opacity: 0.035,

        depthWrite: false

    });


const universeHaze =
    new THREE.Mesh(
        hazeGeometry,
        hazeMaterial
    );

universeHaze.scale.set(
    28,
    19,
    28
);

scene.add(
    universeHaze
);


/* =========================================================
   10. MEMORY DATA
   =========================================================

   timeline:
   0   = 30 May
   25  = 26 June
   55  = 27 July
   60  = 28 July
   75  = 10 August
   100 = future
========================================================= */

const starData = [

    {
        title: 'The First Message',
        date: '30 May 2026',
        timeline: 0,
        importance: 1.0,
        orbit: false,
        text:
            'The beginning. Arsh sent Devam a request on Instagram, expecting him to be a guy from another section.'
    },

    {
        title: 'The Long Night',
        date: '30 → 31 May 2026',
        timeline: 3,
        importance: 1.15,
        orbit: true,
        orbitRadius: 3.0,
        orbitSpeed: 0.10,
        orbitPhase: 0.2,
        text:
            'One conversation turned into an entire night of talking, continuing until around 3 PM.'
    },

    {
        title: 'Two Minds',
        date: 'Those First Days',
        timeline: 7,
        importance: 1.0,
        orbit: true,
        orbitRadius: 3.5,
        orbitSpeed: 0.08,
        orbitPhase: 1.4,
        text:
            'Religion, books, cities, problems, futures, goals, music and pasts. The conversations kept becoming deeper.'
    },

    {
        title: 'No Flirting',
        date: 'The Beginning',
        timeline: 10,
        importance: 0.9,
        orbit: true,
        orbitRadius: 4.0,
        orbitSpeed: 0.07,
        orbitPhase: 2.5,
        text:
            'It did not begin with flirting. It began with genuinely getting to know each other.'
    },

    {
        title: 'Starboy',
        date: '26 June 2026',
        timeline: 25,
        importance: 1.35,
        orbit: true,
        orbitRadius: 2.8,
        orbitSpeed: 0.13,
        orbitPhase: 3.1,
        text:
            'Devam called her “arshbae”, based on her Instagram username. She interpreted it as him calling her bae and replied: “yess my Starboy”.'
    },

    {
        title: 'The Question',
        date: '26 June 2026',
        timeline: 27,
        importance: 1.2,
        orbit: true,
        orbitRadius: 3.3,
        orbitSpeed: 0.11,
        orbitPhase: 4.0,
        text:
            'Devam hinted that he liked someone. Arsh kept asking who. Eventually she asked if it was her.'
    },

    {
        title: 'The Choice',
        date: '27 June 2026',
        timeline: 30,
        importance: 1.5,
        orbit: true,
        orbitRadius: 3.7,
        orbitSpeed: 0.09,
        orbitPhase: 5.0,
        text:
            'Devam told her he liked her but thought his goals would not allow a relationship. She changed his mind by making it clear that she cared about him, not simply his future success.'
    },

    {
        title: 'The Beginning',
        date: '28 July 2026',
        timeline: 60,
        importance: 1.8,
        orbit: true,
        orbitRadius: 2.6,
        orbitSpeed: 0.14,
        orbitPhase: 0.7,
        text:
            'The relationship officially began.'
    },

    {
        title: 'Dee',
        date: 'Private Name',
        timeline: 63,
        importance: 0.85,
        orbit: true,
        orbitRadius: 4.2,
        orbitSpeed: 0.065,
        orbitPhase: 1.8,
        text:
            'One of the names Arsh gave Devam.'
    },

    {
        title: 'Booboo Bear',
        date: 'Private Name',
        timeline: 64,
        importance: 1.0,
        orbit: true,
        orbitRadius: 3.9,
        orbitSpeed: 0.075,
        orbitPhase: 2.4,
        text:
            'Another name Arsh gave Devam. This one belongs to Devam.'
    },

    {
        title: 'The Café',
        date: '10 August 2026',
        timeline: 75,
        importance: 1.8,
        orbit: true,
        orbitRadius: 2.5,
        orbitSpeed: 0.15,
        orbitPhase: 3.0,
        text:
            'Their date. They were shy and smiling, listening to songs, leaning on each other and holding hands.'
    },

    {
        title: 'Enchanted',
        date: '10 August 2026',
        timeline: 76,
        importance: 1.15,
        orbit: true,
        orbitRadius: 3.1,
        orbitSpeed: 0.12,
        orbitPhase: 4.0,
        text:
            'One of the songs playing during their date.'
    },

    {
        title: 'Love Story',
        date: '10 August 2026',
        timeline: 77,
        importance: 1.15,
        orbit: true,
        orbitRadius: 3.6,
        orbitSpeed: 0.10,
        orbitPhase: 4.8,
        text:
            'Another song from their café date.'
    },

    {
        title: 'One Earphone',
        date: '10 August 2026',
        timeline: 78,
        importance: 1.3,
        orbit: true,
        orbitRadius: 2.9,
        orbitSpeed: 0.13,
        orbitPhase: 5.7,
        text:
            'They shared one pair of earphones, each listening from one side.'
    },

    {
        title: 'The Promise',
        date: 'Always',
        timeline: 82,
        importance: 1.7,
        orbit: true,
        orbitRadius: 4.0,
        orbitSpeed: 0.065,
        orbitPhase: 0.9,
        text:
            'No matter what happens in life, they will remember each other and consider this relationship a happy part of their lives.'
    },

    {
        title: 'Risk Is All',
        date: 'Our Song',
        timeline: 84,
        importance: 1.25,
        orbit: true,
        orbitRadius: 3.4,
        orbitSpeed: 0.09,
        orbitPhase: 2.2,
        text:
            'A song connected to their relationship and memories together.'
    },

    {
        title: 'Miami',
        date: 'The Future',
        timeline: 100,
        future: true,
        importance: 1.7,
        orbit: false,
        text:
            'A future dream: a home in Miami.'
    },

    {
        title: 'Weekends',
        date: 'The Future',
        timeline: 100,
        future: true,
        importance: 1.5,
        orbit: false,
        text:
            'A future where weekends are for beaches, movies, rides, movie theatres and simply enjoying life together.'
    },

    {
        title: 'Who She Is',
        date: 'Arsh',
        timeline: 45,
        importance: 1.3,
        orbit: true,
        orbitRadius: 4.4,
        orbitSpeed: 0.06,
        orbitPhase: 4.2,
        text:
            'Her kindness and the way she made Devam feel that she cared about who he actually was, rather than simply what he might become.'
    },

    {
        title: 'Who He Is',
        date: 'Devam',
        timeline: 45,
        importance: 1.3,
        orbit: true,
        orbitRadius: 4.4,
        orbitSpeed: 0.06,
        orbitPhase: 5.2,
        text:
            'The person Arsh saw as knowledgeable, intelligent, nerdy and someone with many ambitions and interests.'
    }

];


/* =========================================================
   11. MAIN STAR DATA
   ========================================================= */

const mainStarData = {

    devam: {

        name: 'Devam',

        nickname:
            'Dee · Booboo Bear',

        qualities:
            'Intellectual · Curious · Ambitious · Deep thinker · Nerdy · Passionate · Football lover',

        description:
            'A deeply curious person who likes understanding how things work, thinking about big ideas and building things that matter.'

    },

    arsh: {

        name: 'Arsh',

        nickname:
            'Arshuuuuumushuu',

        qualities:
            'Kind · Caring · Warm · Understanding · Genuine · Thoughtful · Supportive',

        description:
            'Someone whose kindness and warmth became one of the defining parts of the story, especially because she cared about Devam for who he was rather than simply what he might become.'

    }

};


/* =========================================================
   12. MEMORY STAR POSITIONS
   ========================================================= */

const memoryPositions = [

    [-4.8, 2.7, -4.0],
    [-2.8, -1.8, -5.5],
    [-0.7, 3.4, -6.5],
    [2.2, 2.4, -4.5],
    [4.8, 1.2, -5.8],

    [-5.5, -2.5, -2.5],
    [-3.0, 0.5, -1.8],
    [3.5, -2.4, -3.2],
    [5.2, -1.0, -1.5],
    [1.2, 3.8, -2.8],

    [-5.8, 2.8, 2.0],
    [-3.6, -2.8, 3.5],
    [-1.2, 3.0, 3.8],
    [2.8, 2.5, 3.0],
    [5.5, 0.2, 3.8],

    [-4.0, -0.5, 6.0],
    [-1.0, -3.2, 5.0],
    [2.4, -2.8, 6.2],
    [4.5, 2.7, 5.8],
    [0.0, 0.0, 7.0]

];


/* =========================================================
   13. MEMORY STAR OBJECTS
   ========================================================= */

const interactiveStars = [];

const interactiveStarCores = [];


const memoryCoreGeometry =
    new THREE.SphereGeometry(
        0.095,
        12,
        12
    );


const memoryCoreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xdfffff

    });


const memoryGlowGeometry =
    new THREE.SpriteMaterial({

        map: cyanStarTexture,

        color: 0xffffff,

        transparent: true,

        opacity: 0.8,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending

    });


for (
    let i = 0;
    i < starData.length;
    i++
) {

    const group =
        new THREE.Group();


    const core =
        new THREE.Mesh(
            memoryCoreGeometry,
            memoryCoreMaterial.clone()
        );


    const glow =
        new THREE.Sprite(
            memoryGlowGeometry.clone()
        );


    const size =
        0.55 +
        starData[i].importance *
        0.30;


    glow.scale.set(
        size,
        size,
        1
    );


    group.add(
        glow
    );

    group.add(
        core
    );


    group.position.set(
        memoryPositions[i][0],
        memoryPositions[i][1],
        memoryPositions[i][2]
    );


    group.userData.type =
        'memory';

    group.userData.index =
        i;

    group.userData.data =
        starData[i];

    group.userData.basePosition =
        group.position.clone();

    group.userData.baseScale =
        0.78 +
        starData[i].importance *
        0.22;

    group.scale.setScalar(
        group.userData.baseScale
    );


    scene.add(
        group
    );


    interactiveStars.push(
        group
    );

    interactiveStarCores.push(
        core
    );

}


/* =========================================================
   14. MAIN GOLDEN STARS
   ========================================================= */

const mainStars = [];

const mainStarCores = [];


const mainCoreGeometry =
    new THREE.SphereGeometry(
        0.20,
        20,
        20
    );


const mainCoreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xffefa0

    });


const mainGlowMaterial =
    new THREE.SpriteMaterial({

        map: goldenStarTexture,

        color: 0xffffff,

        transparent: true,

        opacity: 0.95,

        depthWrite: false,

        blending:
            THREE.AdditiveBlending

    });


function createMainStar(
    name,
    position,
    data
) {

    const group =
        new THREE.Group();


    const core =
        new THREE.Mesh(
            mainCoreGeometry,
            mainCoreMaterial.clone()
        );


    const glow =
        new THREE.Sprite(
            mainGlowMaterial.clone()
        );


    glow.scale.set(
        1.65,
        1.65,
        1
    );


    group.add(
        glow
    );

    group.add(
        core
    );


    group.position.set(
        position[0],
        position[1],
        position[2]
    );


    group.userData.type =
        'main';

    group.userData.name =
        name;

    group.userData.data =
        data;


    scene.add(
        group
    );


    mainStars.push(
        group
    );

    mainStarCores.push(
        core
    );


    return group;

}


const devamStar =
    createMainStar(
        'Devam',
        [-1.35, 0, 0],
        mainStarData.devam
    );


const arshStar =
    createMainStar(
        'Arsh',
        [1.35, 0, 0],
        mainStarData.arsh
    );


/* =========================================================
   15. GOLDEN CONNECTION
   ========================================================= */

const connectionGeometry =
    new THREE.BufferGeometry();


const connectionPositions =
    new Float32Array(6);


connectionGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
        connectionPositions,
        3
    )
);


const connectionMaterial =
    new THREE.LineBasicMaterial({

        color: 0xd9eff7,

        transparent: true,

        opacity: 0.24

    });


const connectionLine =
    new THREE.Line(
        connectionGeometry,
        connectionMaterial
    );


scene.add(
    connectionLine
);


/* =========================================================
   16. ORBIT PATHS
   =========================================================

   These are extremely subtle.
   They become visible only when the corresponding
   memory is active enough in the timeline.
========================================================= */

const orbitLines = [];


for (
    let i = 0;
    i < starData.length;
    i++
) {

    const data =
        starData[i];


    if (
        !data.orbit
    ) {

        orbitLines.push(
            null
        );

        continue;

    }


    const points = [];


    for (
        let j = 0;
        j <= 64;
        j++
    ) {

        const angle =
            (
                j / 64
            ) *
            Math.PI *
            2;


        points.push(
            new THREE.Vector3(
                Math.cos(angle) *
                data.orbitRadius,

                Math.sin(angle * 1.3) *
                0.18,

                Math.sin(angle) *
                data.orbitRadius
            )
        );

    }


    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                points
            );


    const material =
        new THREE.LineBasicMaterial({

            color: 0x3e8ca6,

            transparent: true,

            opacity: 0.055,

            depthWrite: false

        });


    const line =
        new THREE.LineLoop(
            geometry,
            material
        );


    scene.add(
        line
    );


    orbitLines.push(
        line
    );

}


/* =========================================================
   17. PROFILE PANEL
   ========================================================= */

const profilePanel =
    document.createElement(
        'div'
    );


profilePanel.className =
    'profile-panel';


profilePanel.innerHTML = `

    <button
        class="profile-close"
        id="profileClose">
        ×
    </button>

    <div
        class="profile-kicker">
        PARTICLE
    </div>

    <div
        class="profile-title"
        id="profileTitle">
        —
    </div>

    <div
        class="profile-nickname"
        id="profileNickname">
        —
    </div>

    <div
        class="profile-qualities"
        id="profileQualities">
        —
    </div>

    <div
        class="profile-description"
        id="profileDescription">
        —
    </div>

`;


document.body.appendChild(
    profilePanel
);


const profileTitle =
    document.getElementById(
        'profileTitle'
    );


const profileNickname =
    document.getElementById(
        'profileNickname'
    );


const profileQualities =
    document.getElementById(
        'profileQualities'
    );


const profileDescription =
    document.getElementById(
        'profileDescription'
    );


function openProfile(
    data
) {

    profileTitle.textContent =
        data.name;

    profileNickname.textContent =
        data.nickname;

    profileQualities.textContent =
        data.qualities;

    profileDescription.textContent =
        data.description;

    profilePanel.classList.add(
        'open'
    );

}


function closeProfile() {

    profilePanel.classList.remove(
        'open'
    );

}


document
    .getElementById(
        'profileClose'
    )
    .addEventListener(
        'click',
        closeProfile
    );


/* =========================================================
   18. MEMORY PANEL
   ========================================================= */

const memoryPanel =
    document.createElement(
        'div'
    );


memoryPanel.className =
    'memory-panel';


memoryPanel.innerHTML = `

    <button
        class="memory-close"
        id="memoryClose">
        ×
    </button>

    <div
        class="memory-kicker">
        MEMORY
    </div>

    <div
        class="memory-title"
        id="memoryTitle">
        —
    </div>

    <div
        class="memory-date"
        id="memoryDate">
        —
    </div>

    <div
        class="memory-text"
        id="memoryText">
        —
    </div>

    <div
        class="memory-hint">
        Every meaningful star here belongs
        to your story.
    </div>

`;


document.body.appendChild(
    memoryPanel
);


const memoryTitle =
    document.getElementById(
        'memoryTitle'
    );


const memoryDate =
    document.getElementById(
        'memoryDate'
    );


const memoryText =
    document.getElementById(
        'memoryText'
    );


function openMemory(
    data
) {

    memoryTitle.textContent =
        data.title;

    memoryDate.textContent =
        data.date;

    memoryText.textContent =
        data.text;

    memoryPanel.classList.add(
        'open'
    );

}


function closeMemory() {

    memoryPanel.classList.remove(
        'open'
    );

}


document
    .getElementById(
        'memoryClose'
    )
    .addEventListener(
        'click',
        closeMemory
    );


/* =========================================================
   19. RAYCASTING
   ========================================================= */

const raycaster =
    new THREE.Raycaster();


const pointer =
    new THREE.Vector2();


let hoveredObject =
    null;


let selectedObject =
    null;


function updatePointer(
    event
) {

    pointer.x =
        (
            event.clientX /
            window.innerWidth
        ) *
        2 -
        1;


    pointer.y =
        -(
            event.clientY /
            window.innerHeight
        ) *
        2 +
        1;

}


/*
   Only currently active memories are
   included in the raycast list.
*/

function getHit(
    event
) {

    updatePointer(
        event
    );


    raycaster.setFromCamera(
        pointer,
        camera
    );


    const clickable =
        [
            ...mainStarCores
        ];


    for (
        const star
        of interactiveStars
    ) {

        if (
            star.visible &&
            star.userData.active
        ) {

            clickable.push(
                star.children[1]
            );

        }

    }


    const hits =
        raycaster.intersectObjects(
            clickable,
            false
        );


    if (
        hits.length === 0
    ) {

        return null;

    }


    return hits[0].object;

}


/* =========================================================
   20. CAMERA FOCUS
   ========================================================= */

let focusActive =
    false;


let focusStartTime =
    0;


const focusDuration =
    850;


const focusStartPosition =
    new THREE.Vector3();


const focusTargetPosition =
    new THREE.Vector3();


const focusLookTarget =
    new THREE.Vector3();


function focusCameraAt(
    group
) {

    const world =
        new THREE.Vector3();


    group.getWorldPosition(
        world
    );


    focusStartPosition.copy(
        camera.position
    );


    const direction =
        new THREE.Vector3()
            .subVectors(
                camera.position,
                world
            );


    if (
        direction.lengthSq() <
        0.01
    ) {

        direction.set(
            0,
            0,
            1
        );

    }


    direction.normalize();


    focusTargetPosition.copy(
        world
    );


    focusTargetPosition.add(
        direction.multiplyScalar(
            3.5
        )
    );


    focusLookTarget.copy(
        world
    );


    focusStartTime =
        performance.now();


    focusActive =
        true;

}


/* =========================================================
   21. MAIN STAR SELECTION
   ========================================================= */

function selectMainStar(
    core
) {

    const group =
        core.parent;


    if (
        !group
    ) {

        return;

    }


    selectedObject =
        group;


    closeMemory();


    openProfile(
        group.userData.data
    );


    focusCameraAt(
        group
    );

}


/* =========================================================
   22. MEMORY SELECTION
   ========================================================= */

function selectMemory(
    core
) {

    const group =
        core.parent;


    if (
        !group
    ) {

        return;

    }


    selectedObject =
        group;


    closeProfile();


    openMemory(
        group.userData.data
    );


    focusCameraAt(
        group
    );

}


/* =========================================================
   23. POINTER DOWN
   ========================================================= */

let pointerDownX =
    0;


let pointerDownY =
    0;


renderer.domElement.addEventListener(
    'pointerdown',
    (event) => {

        pointerDownX =
            event.clientX;

        pointerDownY =
            event.clientY;


        /*
           Once the user starts interacting,
           cinematic focus immediately stops.
        */

        focusActive =
            false;

    }
);


/* =========================================================
   24. POINTER UP
   ========================================================= */

renderer.domElement.addEventListener(
    'pointerup',
    (event) => {

        const dx =
            event.clientX -
            pointerDownX;


        const dy =
            event.clientY -
            pointerDownY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /*
           Dragging is not clicking.
        */

        if (
            distance > 8
        ) {

            return;

        }


        const hit =
            getHit(
                event
            );


        if (
            !hit
        ) {

            selectedObject =
                null;

            closeMemory();

            closeProfile();

            return;

        }


        const group =
            hit.parent;


        if (
            group &&
            group.userData.type ===
            'main'
        ) {

            selectMainStar(
                hit
            );

            return;

        }


        if (
            group &&
            group.userData.type ===
            'memory'
        ) {

            selectMemory(
                hit
            );

        }

    }
);


/* =========================================================
   25. HOVER
   ========================================================= */

renderer.domElement.addEventListener(
    'pointermove',
    (event) => {

        const hit =
            getHit(
                event
            );


        if (
            hoveredObject
        ) {

            hoveredObject.userData.hovered =
                false;

        }


        hoveredObject =
            null;


        if (
            hit
        ) {

            hoveredObject =
                hit.parent;


            hoveredObject.userData.hovered =
                true;


            renderer.domElement.style.cursor =
                'pointer';

        }
        else {

            renderer.domElement.style.cursor =
                'default';

        }

    }
);


/* =========================================================
   26. TIME SYSTEM
   ========================================================= */

let universeTime =
    100;


/*
   100 = current/latest state.

   The slider can move backward through the
   actual story.
*/


function isMemoryActive(
    data
) {

    if (
        data.future
    ) {

        return universeTime >= 96;

    }


    return universeTime >=
        data.timeline;

}


/* =========================================================
   27. MEMORY VISIBILITY
   ========================================================= */

function updateMemoryTimeline() {

    for (
        let i = 0;
        i < interactiveStars.length;
        i++
    ) {

        const star =
            interactiveStars[i];


        const data =
            star.userData.data;


        const active =
            isMemoryActive(
                data
            );


        star.userData.active =
            active;


        /*
           Calculate how strongly the star
           belongs to the current timeline.
        */

        let visibility =
            0;


        if (
            active
        ) {

            visibility =
                Math.min(
                    1,
                    0.30 +
                    (
                        universeTime -
                        data.timeline
                    ) *
                    0.04
                );

        }


        if (
            data.future &&
            universeTime < 96
        ) {

            visibility =
                0.035;

        }


        /*
           The star remains physically present,
           but future objects stay ghost-like
           before their time.
        */

        star.visible =
            visibility > 0;


        const glow =
            star.children[0];


        const core =
            star.children[1];


        glow.material.opacity =
            (
                0.15 +
                visibility *
                0.72
            );


        core.material.opacity =
            Math.max(
                0.12,
                visibility
            );


        /*
           Orbit paths follow timeline visibility.
        */

        const orbit =
            orbitLines[i];


        if (
            orbit
        ) {

            orbit.material.opacity =
                active
                    ? 0.025 +
                      visibility *
                      0.045
                    : 0;

        }

    }

}


/* =========================================================
   28. TIMELINE SLIDER
   ========================================================= */

const timelineUI =
    document.createElement(
        'div'
    );


timelineUI.className =
    'timeline-ui';


timelineUI.innerHTML = `

    <div
        class="timeline-label"
        id="timelineLabel">
        NOW
    </div>

    <input
        id="timelineSlider"
        type="range"
        min="0"
        max="100"
        value="100"
        step="0.1">

    <div
        class="timeline-dates">

        <span>
            30 MAY
        </span>

        <span>
            26 JUN
        </span>

        <span>
            28 JUL
        </span>

        <span>
            10 AUG
        </span>

        <span>
            FUTURE
        </span>

    </div>

`;


document.body.appendChild(
    timelineUI
);


const timelineSlider =
    document.getElementById(
        'timelineSlider'
    );


const timelineLabel =
    document.getElementById(
        'timelineLabel'
    );


function getTimelineLabel(
    value
) {

    if (
        value < 15
    ) {

        return '30 MAY';

    }


    if (
        value < 45
    ) {

        return 'JUNE';

    }


    if (
        value < 70
    ) {

        return '28 JUL';

    }


    if (
        value < 96
    ) {

        return '10 AUG';

    }


    return 'FUTURE';

}


timelineSlider.addEventListener(
    'input',
    () => {

        universeTime =
            Number(
                timelineSlider.value
            );


        timelineLabel.textContent =
            getTimelineLabel(
                universeTime
            );


        updateMemoryTimeline();

    }
);


/* =========================================================
   29. MAIN STAR ANIMATION
   ========================================================= */

function animateMainStars(
    time
) {

    for (
        let i = 0;
        i < mainStars.length;
        i++
    ) {

        const star =
            mainStars[i];


        const glow =
            star.children[0];


        const core =
            star.children[1];


        const pulse =
            (
                Math.sin(
                    time *
                    0.002 +
                    i *
                    1.8
                ) + 1
            ) / 2;


        let scale =
            1;


        if (
            star.userData.hovered
        ) {

            scale =
                1.15;

        }


        if (
            selectedObject ===
            star
        ) {

            scale =
                1.24 +
                pulse *
                0.05;

        }


        star.scale.lerp(
            new THREE.Vector3(
                scale,
                scale,
                scale
            ),
            0.10
        );


        glow.material.opacity =
            0.72 +
            pulse *
            0.23;


        core.material.color.setHex(
            0xffefa0
        );

    }

}


/* =========================================================
   30. MEMORY STAR ANIMATION
   ========================================================= */

function animateMemoryStars(
    time
) {

    for (
        let i = 0;
        i < interactiveStars.length;
        i++
    ) {

        const star =
            interactiveStars[i];


        const data =
            star.userData.data;


        const glow =
            star.children[0];


        const pulse =
            (
                Math.sin(
                    time *
                    0.0015 +
                    i *
                    0.63
                ) + 1
            ) / 2;


        let targetScale =
            star.userData.baseScale;


        if (
            star.userData.hovered
        ) {

            targetScale *=
                1.20;

        }


        if (
            selectedObject ===
            star
        ) {

            targetScale *=
                1.15 +
                pulse *
                0.05;

        }


        star.scale.x +=
            (
                targetScale -
                star.scale.x
            ) *
            0.10;


        star.scale.y +=
            (
                targetScale -
                star.scale.y
            ) *
            0.10;


        star.scale.z +=
            (
                targetScale -
                star.scale.z
            ) *
            0.10;


        /*
           Realistic star shimmer.
        */

        glow.material.opacity =
            0.45 +
            pulse *
            0.30;


        /*
           Orbiting memories.

           Instead of simply moving randomly,
           memories with an orbit property follow
           stable paths around the centre.
        */

        if (
            data.orbit &&
            star.userData.active
        ) {

            const angle =
                data.orbitPhase +
                time *
                0.0001 *
                data.orbitSpeed *
                100;


            const radius =
                data.orbitRadius;


            const x =
                Math.cos(angle) *
                radius;


            const z =
                Math.sin(angle) *
                radius;


            const y =
                Math.sin(
                    angle *
                    1.7
                ) *
                0.32;


            star.position.x +=
                (
                    x -
                    star.position.x
                ) *
                0.018;


            star.position.y +=
                (
                    y -
                    star.position.y
                ) *
                0.018;


            star.position.z +=
                (
                    z -
                    star.position.z
                ) *
                0.018;

        }
        else if (
            !data.orbit
        ) {

            /*
               Non-orbiting memories gently
               drift around their original location.
            */

            const base =
                star.userData.basePosition;


            const driftX =
                Math.sin(
                    time *
                    0.00022 +
                    i
                ) *
                0.08;


            const driftY =
                Math.cos(
                    time *
                    0.00019 +
                    i
                ) *
                0.06;


            const driftZ =
                Math.sin(
                    time *
                    0.00017 +
                    i *
                    0.7
                ) *
                0.08;


            star.position.x +=
                (
                    base.x +
                    driftX -
                    star.position.x
                ) *
                0.012;


            star.position.y +=
                (
                    base.y +
                    driftY -
                    star.position.y
                ) *
                0.012;


            star.position.z +=
                (
                    base.z +
                    driftZ -
                    star.position.z
                ) *
                0.012;

        }

    }

}


/* =========================================================
   31. CONNECTION ANIMATION
   ========================================================= */

function animateConnection(
    time
) {

    connectionPositions[0] =
        devamStar.position.x;

    connectionPositions[1] =
        devamStar.position.y;

    connectionPositions[2] =
        devamStar.position.z;


    connectionPositions[3] =
        arshStar.position.x;

    connectionPositions[4] =
        arshStar.position.y;

    connectionPositions[5] =
        arshStar.position.z;


    connectionGeometry
        .attributes
        .position
        .needsUpdate =
        true;


    const pulse =
        (
            Math.sin(
                time *
                0.0015
            ) + 1
        ) / 2;


    connectionMaterial.opacity =
        0.17 +
        pulse *
        0.10;

}


/* =========================================================
   32. CAMERA FOCUS UPDATE
   ========================================================= */

function updateCameraFocus(
    time
) {

    if (
        !focusActive
    ) {

        return;

    }


    const elapsed =
        time -
        focusStartTime;


    let progress =
        elapsed /
        focusDuration;


    if (
        progress >= 1
    ) {

        progress =
            1;

        focusActive =
            false;

    }


    const eased =
        progress < 0.5
            ? 2 *
              progress *
              progress
            : 1 -
              Math.pow(
                  -2 *
                  progress +
                  2,
                  2
              ) /
              2;


    camera.position.lerpVectors(
        focusStartPosition,
        focusTargetPosition,
        eased
    );


    controls.target.lerp(
        focusLookTarget,
        0.08
    );

}


/* =========================================================
   33. QUANTUM BUTTON
   ========================================================= */

const quantumButton =
    document.createElement(
        'button'
    );


quantumButton.className =
    'top-button';


quantumButton.textContent =
    'QUANTUM STATE';


document.body.appendChild(
    quantumButton
);


/* =========================================================
   34. QUANTUM PANEL
   ========================================================= */

const quantumPanel =
    document.createElement(
        'div'
    );


quantumPanel.className =
    'quantum-panel';


quantumPanel.innerHTML = `

    <button
        class="quantum-close"
        id="quantumClose">
        ×
    </button>

    <div class="quantum-title">
        Quantum State
    </div>

    <div class="quantum-section">

        <h3>
            Okay, Arshuuuuumushuu...
        </h3>

        <p>
            Physics time.
        </p>

    </div>

    <div class="quantum-section">

        <h3>
            What is a quantum state?
        </h3>

        <p>
            A quantum state describes the possible
            state of a quantum system.
        </p>

        <div class="equation">
            |ψ⟩ = α|0⟩ + β|1⟩
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            Probability
        </h3>

        <p>
            The amplitudes determine the probabilities
            of different measurement outcomes.
        </p>

        <div class="equation">
            |α|² + |β|² = 1
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            Entanglement
        </h3>

        <p>
            Multiple quantum systems can share a joint
            state with correlations between them.
        </p>

        <div class="equation">
            |Ψ⟩ =
            1/√2 (|01⟩ + |10⟩)
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            And that is the point.
        </h3>

        <p>
            The universe uses quantum physics as a
            metaphor for connection. Your relationship
            is not literally a quantum-entangled physical
            system. The science inspires the story.
        </p>

    </div>

`;


document.body.appendChild(
    quantumPanel
);


quantumButton.addEventListener(
    'click',
    () => {

        quantumPanel.classList.toggle(
            'open'
        );

    }
);


document
    .getElementById(
        'quantumClose'
    )
    .addEventListener(
        'click',
        () => {

            quantumPanel.classList.remove(
                'open'
            );

        }
    );


/* =========================================================
   35. TUTORIAL BUTTON
   ========================================================= */

const tutorialButton =
    document.createElement(
        'button'
    );


tutorialButton.className =
    'tutorial-button';


tutorialButton.textContent =
    'lemme explain this to my girl';


document.body.appendChild(
    tutorialButton
);


/* =========================================================
   36. TUTORIAL PANEL
   ========================================================= */

const tutorialPanel =
    document.createElement(
        'div'
    );


tutorialPanel.className =
    'quantum-panel';


tutorialPanel.innerHTML = `

    <button
        class="quantum-close"
        id="tutorialClose">
        ×
    </button>

    <div class="quantum-title">
        Lemme explain this to my girl
    </div>

    <div
        id="tutorialContent">
    </div>

`;


document.body.appendChild(
    tutorialPanel
);


const tutorialContent =
    document.getElementById(
        'tutorialContent'
    );


const tutorialPages = [

    {
        title:
            'Okay, Arshuuuuumushuu...',

        text:
            'Physics time. And yes, I somehow decided to put quantum mechanics inside our universe.'
    },

    {
        title:
            'What is a quantum state?',

        text:
            'A quantum state describes the possible state of a quantum system.'
    },

    {
        title:
            'Superposition',

        text:
            'A quantum state can be a combination of possible states before measurement.'
    },

    {
        title:
            'Probability',

        text:
            'The amplitudes determine the probabilities of different measurement outcomes.'
    },

    {
        title:
            'Measurement',

        text:
            'When a quantum system is measured, a definite result is obtained.'
    },

    {
        title:
            'Entanglement',

        text:
            'Two quantum systems can share a joint state whose correlations connect their measurement outcomes.'
    },

    {
        title:
            'And that is the point.',

        text:
            'Our universe uses these ideas as a metaphor. We are not literally quantum-entangled particles. Physics simply gives us a beautiful language for connection, possibility and shared history.'
    }

];


let tutorialPage =
    0;


function renderTutorial() {

    const page =
        tutorialPages[
            tutorialPage
        ];


    tutorialContent.innerHTML = `

        <div class="quantum-section">

            <h3>
                ${page.title}
            </h3>

            <p>
                ${page.text}
            </p>

        </div>

        <div class="tutorial-counter">
            ${tutorialPage + 1}
            /
            ${tutorialPages.length}
        </div>

        <button
            class="tutorial-next"
            id="tutorialNext">

            ${
                tutorialPage ===
                tutorialPages.length - 1
                    ? 'CLOSE'
                    : 'NEXT'
            }

        </button>

    `;


    document
        .getElementById(
            'tutorialNext'
        )
        .addEventListener(
            'click',
            () => {

                if (
                    tutorialPage >=
                    tutorialPages.length - 1
                ) {

                    tutorialPanel.classList.remove(
                        'open'
                    );

                    return;

                }


                tutorialPage++;

                renderTutorial();

            }
        );

}


tutorialButton.addEventListener(
    'click',
    () => {

        quantumPanel.classList.remove(
            'open'
        );

        tutorialPage =
            0;

        renderTutorial();

        tutorialPanel.classList.add(
            'open'
        );

    }
);


document
    .getElementById(
        'tutorialClose'
    )
    .addEventListener(
        'click',
        () => {

            tutorialPanel.classList.remove(
                'open'
            );

        }
    );


/* =========================================================
   37. TITLE
   ========================================================= */

const title =
    document.createElement(
        'div'
    );


title.textContent =
    'OUR UNIVERSE';


title.className =
    'universe-title';


document.body.appendChild(
    title
);


/* =========================================================
   38. LEGEND
   ========================================================= */

const legend =
    document.createElement(
        'div'
    );


legend.className =
    'legend';


legend.innerHTML = `

    <div>
        <span class="legend-yellow"></span>
        Devam + Arsh
    </div>

    <div>
        <span class="legend-blue"></span>
        memories
    </div>

    <div>
        <span class="legend-faint"></span>
        universe
    </div>

`;


document.body.appendChild(
    legend
);


/* =========================================================
   39. CSS
   ========================================================= */

const style =
    document.createElement(
        'style'
    );


style.textContent = `

    * {
        box-sizing: border-box;
    }


    body {
        font-family:
            Arial,
            Helvetica,
            sans-serif;

        color:
            white;
    }


    .universe-title {

        position:
            fixed;

        top:
            22px;

        left:
            50%;

        transform:
            translateX(-50%);

        z-index:
            15;

        pointer-events:
            none;

        font-size:
            13px;

        letter-spacing:
            5px;

        color:
            rgba(210,240,248,0.72);

    }


    .legend {

        position:
            fixed;

        left:
            18px;

        bottom:
            105px;

        z-index:
            15;

        pointer-events:
            none;

        font-size:
            10px;

        line-height:
            1.9;

        color:
            rgba(190,230,240,0.55);

    }


    .legend-yellow,
    .legend-blue,
    .legend-faint {

        display:
            inline-block;

        border-radius:
            50%;

        margin-right:
            7px;

    }


    .legend-yellow {

        width:
            8px;

        height:
            8px;

        background:
            #ffe47a;

        box-shadow:
            0 0 10px
            rgba(255,215,70,0.95);

    }


    .legend-blue {

        width:
            7px;

        height:
            7px;

        background:
            #9feeff;

        box-shadow:
            0 0 8px
            rgba(60,220,255,0.9);

    }


    .legend-faint {

        width:
            5px;

        height:
            5px;

        background:
            #83b8ca;

    }


    .top-button {

        position:
            fixed;

        top:
            20px;

        right:
            20px;

        z-index:
            25;

        pointer-events:
            auto;

        border:
            1px solid
            rgba(170,225,240,0.20);

        background:
            rgba(2,15,24,0.62);

        color:
            rgba(220,248,255,0.88);

        padding:
            10px 14px;

        border-radius:
            8px;

        font-size:
            10px;

        letter-spacing:
            1.2px;

        cursor:
            pointer;

        backdrop-filter:
            blur(8px);

    }


    .top-button:hover {

        background:
            rgba(100,210,235,0.10);

    }


    .profile-panel,
    .memory-panel {

        position:
            fixed;

        top:
            0;

        right:
            0;

        z-index:
            30;

        width:
            min(390px, 88vw);

        height:
            100vh;

        padding:
            34px 28px;

        overflow-y:
            auto;

        background:
            rgba(1,10,16,0.91);

        border-left:
            1px solid
            rgba(170,225,240,0.14);

        backdrop-filter:
            blur(16px);

        transform:
            translateX(100%);

        transition:
            transform 0.35s ease;

        pointer-events:
            auto;

    }


    .profile-panel.open,
    .memory-panel.open {

        transform:
            translateX(0);

    }


    .profile-close,
    .memory-close,
    .quantum-close {

        position:
            absolute;

        top:
            18px;

        right:
            20px;

        border:
            none;

        background:
            none;

        color:
            rgba(220,248,255,0.72);

        font-size:
            28px;

        cursor:
            pointer;

    }


    .profile-kicker,
    .memory-kicker {

        margin-top:
            24px;

        font-size:
            9px;

        letter-spacing:
            3px;

        color:
            rgba(160,220,235,0.45);

        text-transform:
            uppercase;

    }


    .profile-title,
    .memory-title {

        margin-top:
            10px;

        font-size:
            29px;

        font-weight:
            300;

        line-height:
            1.15;

    }


    .profile-nickname {

        margin-top:
            9px;

        color:
            rgba(255,220,100,0.78);

        font-size:
            12px;

    }


    .profile-qualities {

        margin-top:
            25px;

        font-size:
            12px;

        line-height:
            1.8;

        color:
            rgba(220,248,255,0.66);

    }


    .profile-description,
    .memory-text {

        margin-top:
            24px;

        font-size:
            14px;

        line-height:
            1.8;

        color:
            rgba(220,242,248,0.76);

    }


    .memory-date {

        margin-top:
            12px;

        font-size:
            12px;

        color:
            rgba(160,220,235,0.48);

    }


    .memory-hint {

        margin-top:
            30px;

        font-size:
            10px;

        line-height:
            1.7;

        color:
            rgba(160,220,235,0.32);

    }


    .quantum-panel {

        position:
            fixed;

        top:
            0;

        left:
            0;

        z-index:
            30;

        width:
            min(440px, 90vw);

        height:
            100vh;

        padding:
            34px;

        overflow-y:
            auto;

        background:
            rgba(1,10,16,0.93);

        border-right:
            1px solid
            rgba(170,225,240,0.14);

        backdrop-filter:
            blur(16px);

        transform:
            translateX(-100%);

        transition:
            transform 0.35s ease;

        pointer-events:
            auto;

    }


    .quantum-panel.open {

        transform:
            translateX(0);

    }


    .quantum-title {

        margin-top:
            28px;

        font-size:
            26px;

        font-weight:
            300;

        color:
            rgba(225,248,255,0.92);

    }


    .quantum-section {

        margin-top:
            28px;

    }


    .quantum-section h3 {

        margin:
            0 0 9px 0;

        font-size:
            13px;

        font-weight:
            400;

        letter-spacing:
            1px;

        color:
            rgba(220,248,255,0.9);

    }


    .quantum-section p {

        margin:
            0;

        font-size:
            13px;

        line-height:
            1.75;

        color:
            rgba(210,240,248,0.67);

    }


    .equation {

        margin-top:
            12px;

        padding:
            14px;

        border:
            1px solid
            rgba(170,225,240,0.12);

        border-radius:
            8px;

        color:
            rgba(225,248,255,0.9);

        font-family:
            Georgia,
            serif;

        font-size:
            17px;

        text-align:
            center;

    }


    .tutorial-button {

        position:
            fixed;

        right:
            20px;

        bottom:
            70px;

        z-index:
            25;

        pointer-events:
            auto;

        border:
            1px solid
            rgba(170,225,240,0.12);

        background:
            rgba(2,15,24,0.58);

        color:
            rgba(215,245,252,0.70);

        padding:
            10px 13px;

        border-radius:
            8px;

        font-size:
            10px;

        cursor:
            pointer;

        backdrop-filter:
            blur(8px);

    }


    .tutorial-button:hover {

        background:
            rgba(100,210,235,0.09);

    }


    .tutorial-counter {

        margin-top:
            18px;

        font-size:
            9px;

        letter-spacing:
            2px;

        color:
            rgba(160,220,235,0.35);

    }


    .tutorial-next {

        margin-top:
            28px;

        border:
            1px solid
            rgba(170,225,240,0.16);

        background:
            rgba(100,210,235,0.05);

        color:
            rgba(225,248,255,0.86);

        padding:
            10px 15px;

        border-radius:
            7px;

        cursor:
            pointer;

        font-size:
            10px;

    }


    /* ===============================
       TIMELINE
       =============================== */

    .timeline-ui {

        position:
            fixed;

        left:
            50%;

        bottom:
            17px;

        transform:
            translateX(-50%);

        z-index:
            25;

        width:
            min(600px, 82vw);

        pointer-events:
            auto;

        text-align:
            center;

    }


    .timeline-label {

        margin-bottom:
            4px;

        font-size:
            9px;

        letter-spacing:
            2px;

        color:
            rgba(210,242,250,0.62);

    }


    #timelineSlider {

        width:
            100%;

        height:
            3px;

        appearance:
            none;

        background:
            rgba(130,200,220,0.20);

        border-radius:
            5px;

        outline:
            none;

        cursor:
            pointer;

    }


    #timelineSlider::-webkit-slider-thumb {

        appearance:
            none;

        width:
            12px;

        height:
            12px;

        border-radius:
            50%;

        background:
            #d8f7ff;

        box-shadow:
            0 0 10px
            rgba(90,220,255,0.8);

        cursor:
            pointer;

    }


    #timelineSlider::-moz-range-thumb {

        width:
            12px;

        height:
            12px;

        border:
            none;

        border-radius:
            50%;

        background:
            #d8f7ff;

        box-shadow:
            0 0 10px
            rgba(90,220,255,0.8);

        cursor:
            pointer;

    }


    .timeline-dates {

        display:
            flex;

        justify-content:
            space-between;

        margin-top:
            5px;

        font-size:
            7px;

        letter-spacing:
            0.8px;

        color:
            rgba(160,220,235,0.34);

    }


    @media (max-width: 600px) {

        .universe-title {

            font-size:
                10px;

            letter-spacing:
                3px;

        }


        .top-button {

            top:
                54px;

            right:
                14px;

        }


        .legend {

            bottom:
                110px;

            left:
                12px;

        }


        .tutorial-button {

            right:
                12px;

            bottom:
                66px;

            max-width:
                185px;

        }


        .timeline-ui {

            width:
                88vw;

            bottom:
                12px;

        }


        .timeline-dates {

            font-size:
                6px;

        }

    }

`;


document.head.appendChild(
    style
);


/* =========================================================
   40. INITIAL STATE
   ========================================================= */

updateMemoryTimeline();


/* =========================================================
   41. ANIMATION LOOP
   ========================================================= */

function animate(
    time
) {

    requestAnimationFrame(
        animate
    );


    updateCameraFocus(
        time
    );


    animateMainStars(
        time
    );


    animateMemoryStars(
        time
    );


    animateConnection(
        time
    );


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate(
    performance.now()
);


/* =========================================================
   42. RESIZE
   ========================================================= */

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );


        renderer.setPixelRatio(
            1
        );

    }
);


/*
=========================================================
STAGE 8 COMPLETE
=========================================================
*/