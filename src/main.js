import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* =========================================================
   OUR UNIVERSE
   Main Universe Renderer
   ========================================================= */


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
        window.innerWidth / window.innerHeight,
        0.1,
        200
    );

camera.position.set(
    0,
    1.8,
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
   4. ORBIT CONTROLS
   ========================================================= */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;

controls.dampingFactor =
    0.06;

controls.minDistance = 2;

controls.maxDistance = 80;

controls.rotateSpeed =
    0.55;

controls.zoomSpeed =
    0.8;

controls.panSpeed =
    0.7;

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
   6. BACKGROUND UNIVERSE
   Soft light-blue theme.
   These stars are decorative and NOT clickable.
   ========================================================= */

const backgroundStarCount = 420;

const backgroundPositions =
    new Float32Array(
        backgroundStarCount * 3
    );

for (
    let i = 0;
    i < backgroundStarCount;
    i++
) {

    const i3 = i * 3;

    backgroundPositions[i3] =
        (Math.random() - 0.5) * 75;

    backgroundPositions[i3 + 1] =
        (Math.random() - 0.5) * 55;

    backgroundPositions[i3 + 2] =
        (Math.random() - 0.5) * 75;
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

        size: 0.09,

        transparent: true,

        opacity: 0.72,

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
   7. SUBTLE BLUE UNIVERSE HAZE
   Very lightweight transparent spheres.
   ========================================================= */

const hazeGeometry =
    new THREE.SphereGeometry(
        1,
        16,
        16
    );

const hazeMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x163b50,

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
    25,
    18,
    25
);

scene.add(
    universeHaze
);


/* =========================================================
   8. ACTUAL MEMORY DATA
   ========================================================= */

const starData = [

    {
        title: 'The First Message',
        date: '30 May 2026',
        text:
            'The beginning. Arsh sent Devam a request on Instagram, expecting him to be a guy from another section.'
    },

    {
        title: 'The Long Night',
        date: '30 → 31 May 2026',
        text:
            'One conversation turned into an entire night of talking, continuing until around 3 PM.'
    },

    {
        title: 'Two Minds',
        date: 'Those First Days',
        text:
            'Religion, books, cities, problems, futures, goals, music and pasts. The conversations kept becoming deeper.'
    },

    {
        title: 'No Flirting',
        date: 'The Beginning',
        text:
            'It did not begin with flirting. It began with genuinely getting to know each other.'
    },

    {
        title: 'Starboy',
        date: '26 June 2026',
        text:
            'Devam called her “arshbae”, based on her Instagram username. She interpreted it as him calling her bae and replied: “yess my Starboy”.'
    },

    {
        title: 'The Question',
        date: '26 June 2026',
        text:
            'Devam hinted that he liked someone. Arsh kept asking who. Eventually she asked if it was her.'
    },

    {
        title: 'The Choice',
        date: '27 June 2026',
        text:
            'Devam told her he liked her but thought his goals would not allow a relationship. She changed his mind by making it clear that she cared about him, not simply his future success.'
    },

    {
        title: 'The Beginning',
        date: '28 July 2026',
        text:
            'The relationship officially began.'
    },

    {
        title: 'Dee',
        date: 'Private Name',
        text:
            'One of the names Arsh gave Devam.'
    },

    {
        title: 'Booboo Bear',
        date: 'Private Name',
        text:
            'Another name Arsh gave Devam. This one belongs to Devam.'
    },

    {
        title: 'The Café',
        date: '10 August 2026',
        text:
            'Their date. They were shy and smiling, listening to songs, leaning on each other and holding hands.'
    },

    {
        title: 'Enchanted',
        date: '10 August 2026',
        text:
            'One of the songs playing during their date.'
    },

    {
        title: 'Love Story',
        date: '10 August 2026',
        text:
            'Another song from their café date.'
    },

    {
        title: 'One Earphone',
        date: '10 August 2026',
        text:
            'They shared one pair of earphones, each listening from one side.'
    },

    {
        title: 'The Promise',
        date: 'Always',
        text:
            'No matter what happens in life, they will remember each other and consider this relationship a happy part of their lives.'
    },

    {
        title: 'Risk Is All',
        date: 'Our Song',
        text:
            'A song connected to their relationship and memories together.'
    },

    {
        title: 'Miami',
        date: 'The Future',
        text:
            'A future dream: a home in Miami.'
    },

    {
        title: 'Weekends',
        date: 'The Future',
        text:
            'A future where weekends are for beaches, movies, rides, movie theatres and simply enjoying life together.'
    },

    {
        title: 'Who She Is',
        date: 'Arsh',
        text:
            'Her kindness and the way she made Devam feel that she cared about who he actually was, rather than simply what he might become.'
    },

    {
        title: 'Who He Is',
        date: 'Devam',
        text:
            'The person Arsh saw as knowledgeable, intelligent, nerdy and someone with many ambitions and interests.'
    }

];


/* =========================================================
   9. MAIN STAR DATA
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
   10. INTERACTIVE MEMORY STARS
   ========================================================= */

const interactiveStars = [];

const interactiveStarCores = [];


const memoryCoreGeometry =
    new THREE.SphereGeometry(
        0.095,
        12,
        12
    );


const memoryGlowGeometry =
    new THREE.SphereGeometry(
        0.23,
        12,
        12
    );


const memoryCoreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xd9f8ff

    });


const memoryGlowMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x55dfff,

        transparent: true,

        opacity: 0.34,

        depthWrite: false

    });


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


for (
    let i = 0;
    i < starData.length;
    i++
) {

    const group =
        new THREE.Group();


    const glow =
        new THREE.Mesh(
            memoryGlowGeometry,
            memoryGlowMaterial.clone()
        );


    const core =
        new THREE.Mesh(
            memoryCoreGeometry,
            memoryCoreMaterial.clone()
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


    const scale =
        0.88 +
        (i % 5) * 0.08;


    group.scale.setScalar(
        scale
    );


    group.userData.index =
        i;

    group.userData.data =
        starData[i];

    group.userData.type =
        'memory';


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
   11. MAIN STARS
   Devam + Arsh
   Bright yellow/gold.
   ========================================================= */

const mainStars = [];

const mainStarCores = [];


const mainCoreGeometry =
    new THREE.SphereGeometry(
        0.20,
        20,
        20
    );


const mainGlowGeometry =
    new THREE.SphereGeometry(
        0.48,
        20,
        20
    );


const mainHaloGeometry =
    new THREE.SphereGeometry(
        0.72,
        20,
        20
    );


const mainCoreMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xfff2a3

    });


const mainGlowMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xffd84d,

        transparent: true,

        opacity: 0.24,

        depthWrite: false

    });


const mainHaloMaterial =
    new THREE.MeshBasicMaterial({

        color: 0xffc933,

        transparent: true,

        opacity: 0.08,

        depthWrite: false

    });


function createMainStar(
    name,
    position,
    data
) {

    const group =
        new THREE.Group();


    const halo =
        new THREE.Mesh(
            mainHaloGeometry,
            mainHaloMaterial.clone()
        );


    const glow =
        new THREE.Mesh(
            mainGlowGeometry,
            mainGlowMaterial.clone()
        );


    const core =
        new THREE.Mesh(
            mainCoreGeometry,
            mainCoreMaterial.clone()
        );


    group.add(
        halo
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

    /*
       THIS IS THE IMPORTANT FIX.

       The main-star cores are explicitly added
       to the raycasting list.
    */

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
   12. CONNECTION BETWEEN DEVAM + ARSH
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

        color: 0xd6eff8,

        transparent: true,

        opacity: 0.25

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
   13. MAIN STAR PULSE RINGS
   ========================================================= */

const ringGeometry =
    new THREE.RingGeometry(
        0.28,
        0.30,
        32
    );


const devamRing =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({

            color: 0xffdf61,

            transparent: true,

            opacity: 0.18,

            side: THREE.DoubleSide

        })
    );


const arshRing =
    new THREE.Mesh(
        ringGeometry,
        new THREE.MeshBasicMaterial({

            color: 0xffdf61,

            transparent: true,

            opacity: 0.18,

            side: THREE.DoubleSide

        })
    );


devamRing.rotation.x =
    Math.PI / 2;

arshRing.rotation.x =
    Math.PI / 2;


scene.add(
    devamRing
);

scene.add(
    arshRing
);


/* =========================================================
   14. MAIN STAR PROFILE PANEL
   ========================================================= */

function createProfilePanel() {

    const panel =
        document.createElement(
            'div'
        );

    panel.id =
        'profilePanel';

    panel.className =
        'profile-panel';


    panel.innerHTML = `

        <button
            class="profile-close"
            id="profileClose">
            ×
        </button>

        <div
            class="profile-kicker"
            id="profileKicker">
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
        panel
    );


    return panel;

}


const profilePanel =
    createProfilePanel();


const profileClose =
    document.getElementById(
        'profileClose'
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


profileClose.addEventListener(
    'click',
    closeProfile
);


/* =========================================================
   15. DEVAM + ARSH CORE VISUALS
   ========================================================= */

const particleGeometry =
    new THREE.SphereGeometry(
        0.13,
        16,
        16
    );


const devamParticle =
    new THREE.Mesh(
        particleGeometry,
        new THREE.MeshBasicMaterial({

            color: 0xfff1a1

        })
    );


const arshParticle =
    new THREE.Mesh(
        particleGeometry,
        new THREE.MeshBasicMaterial({

            color: 0xfff1a1

        })
    );


devamParticle.position.set(
    -1.35,
    0,
    0
);

arshParticle.position.set(
    1.35,
    0,
    0
);


scene.add(
    devamParticle
);

scene.add(
    arshParticle
);


/* =========================================================
   16. POINTER/RAYCASTER
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
        (event.clientX /
            window.innerWidth) *
        2 -
        1;


    pointer.y =
        -(event.clientY /
            window.innerHeight) *
        2 +
        1;

}


/* =========================================================
   17. FIND INTERACTIVE OBJECT
   ========================================================= */

function getInteractiveHit(
    event
) {

    updatePointer(
        event
    );


    raycaster.setFromCamera(
        pointer,
        camera
    );


    /*
       IMPORTANT:

       Both systems are included:

       1. 20 memory stars
       2. Devam + Arsh

       This restores clicking on the two main stars.
    */

    const allClickableCores =
        [
            ...interactiveStarCores,
            ...mainStarCores
        ];


    const hits =
        raycaster.intersectObjects(
            allClickableCores,
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
   18. SELECT MAIN STAR
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


    openProfile(
        group.userData.data
    );


    focusCameraAt(
        group
    );

}


/* =========================================================
   19. MEMORY PANEL
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
        class="memory-kicker"
        id="memoryKicker">
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

    <div class="memory-hint">
        This star is part of your story.
        Move freely through the universe and
        select another star whenever you want.
    </div>

`;


document.body.appendChild(
    memoryPanel
);


const memoryClose =
    document.getElementById(
        'memoryClose'
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


const memoryKicker =
    document.getElementById(
        'memoryKicker'
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

    memoryKicker.textContent =
        'MEMORY';

    memoryPanel.classList.add(
        'open'
    );

}


function closeMemory() {

    memoryPanel.classList.remove(
        'open'
    );

}


memoryClose.addEventListener(
    'click',
    closeMemory
);


/* =========================================================
   20. CAMERA FOCUS
   Short cinematic movement only.
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

    const worldPosition =
        new THREE.Vector3();


    group.getWorldPosition(
        worldPosition
    );


    focusStartPosition.copy(
        camera.position
    );


    const direction =
        new THREE.Vector3()
            .subVectors(
                camera.position,
                worldPosition
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
        worldPosition
    );


    focusTargetPosition.add(
        direction.multiplyScalar(
            3.5
        )
    );


    focusLookTarget.copy(
        worldPosition
    );


    focusStartTime =
        performance.now();


    focusActive =
        true;

}


/* =========================================================
   21. CLICK / DRAG DETECTION
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
           User takes control immediately.
        */

        focusActive =
            false;

    }
);


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
           Movement means drag.
        */

        if (
            distance > 8
        ) {

            return;

        }


        const hit =
            getInteractiveHit(
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

            closeMemory();

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

            closeProfile();

            selectedObject =
                group;

            openMemory(
                group.userData.data
            );

            focusCameraAt(
                group
            );

        }

    }
);


/* =========================================================
   22. HOVER
   ========================================================= */

renderer.domElement.addEventListener(
    'pointermove',
    (event) => {

        const hit =
            getInteractiveHit(
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
   23. MAIN STAR ANIMATION
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


        const halo =
            star.children[0];


        const glow =
            star.children[1];


        const core =
            star.children[2];


        const pulse =
            (
                Math.sin(
                    time * 0.002 +
                    i * 1.8
                ) + 1
            ) / 2;


        let targetScale =
            1;


        if (
            star.userData.hovered
        ) {

            targetScale =
                1.16;

        }


        if (
            selectedObject ===
            star
        ) {

            targetScale =
                1.24 +
                pulse * 0.05;

        }


        star.scale.x +=
            (
                targetScale -
                star.scale.x
            ) * 0.10;


        star.scale.y +=
            (
                targetScale -
                star.scale.y
            ) * 0.10;


        star.scale.z +=
            (
                targetScale -
                star.scale.z
            ) * 0.10;


        glow.material.opacity =
            0.20 +
            pulse * 0.13;


        halo.material.opacity =
            0.055 +
            pulse * 0.035;


        core.material.color.setHex(
            0xfff0a0
        );

    }


    /*
       Make the actual particle cores
       glow in the same golden family.
    */

    devamParticle.material.color.setHex(
        0xfff0a0
    );

    arshParticle.material.color.setHex(
        0xfff0a0
    );

}


/* =========================================================
   24. MEMORY STAR ANIMATION
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


        const glow =
            star.children[0];


        const core =
            star.children[1];


        const pulse =
            (
                Math.sin(
                    time * 0.0015 +
                    i * 0.65
                ) + 1
            ) / 2;


        let targetScale =
            1;


        let targetGlow =
            0.28 +
            pulse * 0.10;


        if (
            star.userData.hovered
        ) {

            targetScale =
                1.25;

            targetGlow =
                0.48;

        }


        if (
            selectedObject ===
            star
        ) {

            targetScale =
                1.34 +
                pulse * 0.04;

            targetGlow =
                0.62;

        }


        star.scale.x +=
            (
                targetScale -
                star.scale.x
            ) * 0.12;


        star.scale.y +=
            (
                targetScale -
                star.scale.y
            ) * 0.12;


        star.scale.z +=
            (
                targetScale -
                star.scale.z
            ) * 0.12;


        glow.material.opacity +=
            (
                targetGlow -
                glow.material.opacity
            ) * 0.10;


        core.material.color.setHex(
            0xd9f8ff
        );


        /*
           Gentle movement.
        */

        if (
            star.userData.baseY ===
            undefined
        ) {

            star.userData.baseY =
                star.position.y;

        }


        star.position.y =
            star.userData.baseY +
            Math.sin(
                time * 0.00045 +
                i
            ) *
            0.045;

    }

}


/* =========================================================
   25. DEVAM + ARSH CONNECTION
   ========================================================= */

function animateConnection() {

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


    /*
       Keep the visual particles moving
       subtly around the main stars.
    */

    const time =
        clock.getElapsedTime();


    devamParticle.position.y =
        Math.sin(
            time * 1.2
        ) *
        0.08;


    arshParticle.position.y =
        Math.sin(
            time * 1.1 +
            1.7
        ) *
        0.08;


    devamRing.position.copy(
        devamParticle.position
    );


    arshRing.position.copy(
        arshParticle.position
    );

}


/* =========================================================
   26. CAMERA FOCUS UPDATE
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
            ? 2 * progress * progress
            : 1 -
              Math.pow(
                  -2 * progress + 2,
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
   27. QUANTUM PANEL
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
            1. What is a quantum state?
        </h3>

        <p>
            In quantum mechanics, a system is
            described by a quantum state.
            It contains everything we can know
            about that system.
        </p>

        <div class="equation">
            |ψ⟩ = α|0⟩ + β|1⟩
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            2. Superposition
        </h3>

        <p>
            A quantum system can be described
            as a combination of possible states
            before measurement.
        </p>

    </div>

    <div class="quantum-section">

        <h3>
            3. Probability
        </h3>

        <p>
            The amplitudes determine the
            probabilities of different outcomes.
        </p>

        <div class="equation">
            |α|² + |β|² = 1
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            4. Measurement
        </h3>

        <p>
            When a quantum system is measured,
            a definite result is obtained.
        </p>

    </div>

    <div class="quantum-section">

        <h3>
            5. Entanglement
        </h3>

        <p>
            Multiple quantum systems can share
            a joint state whose correlations cannot
            be described independently.
        </p>

        <div class="equation">
            |Ψ⟩ =
            1/√2 (|01⟩ + |10⟩)
        </div>

    </div>

    <div class="quantum-section">

        <h3>
            6. And that is the point.
        </h3>

        <p>
            The universe uses quantum physics
            as a metaphor for connection.
            Your relationship is not literally
            a quantum-entangled physical system.
            The science inspires the story.
        </p>

    </div>

`;


document.body.appendChild(
    quantumPanel
);


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


const quantumClose =
    document.getElementById(
        'quantumClose'
    );


quantumButton.addEventListener(
    'click',
    () => {

        quantumPanel.classList.toggle(
            'open'
        );

    }
);


quantumClose.addEventListener(
    'click',
    () => {

        quantumPanel.classList.remove(
            'open'
        );

    }
);


/* =========================================================
   28. TUTORIAL
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


const tutorialPanel =
    document.createElement(
        'div'
    );


tutorialPanel.className =
    'quantum-panel tutorial-panel';


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


const tutorialClose =
    document.getElementById(
        'tutorialClose'
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
            'A quantum state describes the possible state of a quantum system and everything we can know about it.'
    },

    {
        title:
            'Superposition',

        text:
            'Instead of being restricted to one classical possibility, a quantum state can be a combination of possibilities.'
    },

    {
        title:
            'Probability',

        text:
            'The amplitudes inside the quantum state determine the probabilities of possible measurement outcomes.'
    },

    {
        title:
            'Measurement',

        text:
            'When a quantum system is measured, we obtain a definite result.'
    },

    {
        title:
            'Entanglement',

        text:
            'Two quantum systems can share a joint state. Measuring one can reveal correlations with the other.'
    },

    {
        title:
            'And that is the point.',

        text:
            'Our universe uses these ideas as a metaphor. We are not literally quantum-entangled particles. The language of physics simply gives us a beautiful way to represent connection, possibility and shared history.'
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


tutorialClose.addEventListener(
    'click',
    () => {

        tutorialPanel.classList.remove(
            'open'
        );

    }
);


/* =========================================================
   29. UI / VISUAL STYLE
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

        color: white;
    }


    .top-button {

        position: fixed;

        top: 20px;

        right: 20px;

        z-index: 20;

        pointer-events: auto;

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

        position: fixed;

        top: 0;

        right: 0;

        z-index: 30;

        width:
            min(390px, 88vw);

        height: 100vh;

        padding:
            34px 28px;

        overflow-y: auto;

        background:
            rgba(1,10,16,0.90);

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

        position: absolute;

        top: 18px;

        right: 20px;

        border: none;

        background: none;

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

        position: fixed;

        top: 0;

        left: 0;

        z-index: 30;

        width:
            min(440px, 90vw);

        height: 100vh;

        padding:
            34px;

        overflow-y: auto;

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

        position: fixed;

        right: 20px;

        bottom: 70px;

        z-index: 20;

        pointer-events: auto;

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


    @media (max-width: 600px) {

        .top-button {

            top:
                55px;

            right:
                14px;

        }


        .tutorial-button {

            right:
                14px;

            bottom:
                65px;

            max-width:
                190px;

        }

    }

`;


document.head.appendChild(
    style
);


/* =========================================================
   30. TITLE
   ========================================================= */

const title =
    document.createElement(
        'div'
    );


title.textContent =
    'OUR UNIVERSE';


title.style.position =
    'fixed';


title.style.top =
    '22px';


title.style.left =
    '50%';


title.style.transform =
    'translateX(-50%)';


title.style.zIndex =
    '15';


title.style.pointerEvents =
    'none';


title.style.fontSize =
    '13px';


title.style.letterSpacing =
    '5px';


title.style.color =
    'rgba(210,240,248,0.72)';


document.body.appendChild(
    title
);


/* =========================================================
   31. LEGEND
   ========================================================= */

const legend =
    document.createElement(
        'div'
    );


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


legend.style.position =
    'fixed';


legend.style.left =
    '18px';


legend.style.bottom =
    '72px';


legend.style.zIndex =
    '15';


legend.style.pointerEvents =
    'none';


legend.style.fontSize =
    '10px';


legend.style.lineHeight =
    '1.9';


legend.style.color =
    'rgba(190,230,240,0.55)';


document.body.appendChild(
    legend
);


/* =========================================================
   32. LEGEND STYLES
   ========================================================= */

const legendStyle =
    document.createElement(
        'style'
    );


legendStyle.textContent = `

    .legend-yellow {

        display:
            inline-block;

        width:
            8px;

        height:
            8px;

        margin-right:
            7px;

        border-radius:
            50%;

        background:
            #ffe47a;

        box-shadow:
            0 0 9px
            rgba(255,215,70,0.95);

    }


    .legend-blue {

        display:
            inline-block;

        width:
            7px;

        height:
            7px;

        margin-right:
            7px;

        border-radius:
            50%;

        background:
            #a8efff;

        box-shadow:
            0 0 8px
            rgba(60,220,255,0.9);

    }


    .legend-faint {

        display:
            inline-block;

        width:
            5px;

        height:
            5px;

        margin-right:
            7px;

        border-radius:
            50%;

        background:
            #83b8ca;

    }

`;


document.head.appendChild(
    legendStyle
);


/* =========================================================
   33. CLOCK
   ========================================================= */

const clock =
    new THREE.Clock();


/* =========================================================
   34. MAIN ANIMATION LOOP
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


    animateConnection();


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
   35. RESIZE
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


/* =========================================================
   DONE
   ========================================================= */
