// Abilities Modal System
class AbilitiesModal {
    constructor() {
        this.abilities = {
            // Masuke abilities
            'masuren': {
                title: 'Masuren',
                image: 'public/images/MASUREN.png',
                description: 'Energia elétrica sombria com raios escuros e brilho arroxeado. Esta técnica permite a Masuke canalizar a energia das trevas através de seu corpo, criando descargas elétricas devastadoras que podem ser usadas tanto em combate corpo a corpo quanto em ataques à distância.'
            },
            'death-eyes': {
                title: 'Death Eyes',
                image: 'public/images/Death Eyes.jpg',
                description: 'Olhos completamente negros que permitem a Masuke invocar Mr. Morte e ver através das dimensões espirituais. Esta habilidade ancestral é herança de sua linhagem sombria, permitindo-lhe enxergar a morte e manipular energias necromânticas.'
            },
            'fogo-trevas': {
                title: 'Fogo das Trevas',
                image: 'public/images/fireblack.png',
                description: 'Fogo negro com labaredas roxas que causa paralisia e dor contínua. Diferente do fogo comum, estas chamas se alimentam da energia espiritual do oponente, causando danos tanto físicos quanto espirituais.'
            },
            
            // Drakom abilities
            'draison': {
                title: 'Draison',
                image: 'public/images/Draison.jpg',
                description: 'Esfera giratória de energia dracônica vermelha que causa explosão em espiral. Esta técnica concentra todo o poder dracônico de Drakom em uma esfera de energia pura, capaz de devastar grandes áreas com sua explosão controlada.'
            },
            'making': {
                title: 'Making',
                image: 'public/images/making.jpg',
                description: 'Teletransporte instantâneo baseado em energia dracônica sensitiva. Drakom pode se mover através do espaço utilizando portais de energia dracônica, permitindo-lhe aparecer instantaneamente em qualquer local dentro de seu alcance.'
            },
            'invocacao-dragoes': {
                title: 'Invocação de Dragões',
                image: 'public/images/invocdrak.jpg',
                description: 'Capacidade de invocar grandes dragões vermelhos de energia para ataque, defesa e montaria espiritual. Estes dragões são manifestações da essência dracônica de Drakom, obedecendo apenas à sua vontade.'
            },
            
            // Shizuke abilities
            'fenix-agua': {
                title: 'Fênix de Água',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Invocação de uma fênix feita de água pura que pode regenerar e atacar simultaneamente. Esta criatura aquática possui a capacidade de renascer das próprias águas, tornando-se praticamente imortal em combate.'
            },
            'shizurem': {
                title: 'Shizurem',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Técnica de controle total sobre as águas, permitindo manipular desde gotas até tsunamis. Shizuke pode moldar a água em qualquer forma desejada, desde armas cortantes até escudos protetivos.'
            },
            'replica-agua': {
                title: 'Réplica de Água',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Criação de clones feitos de água que podem lutar independentemente. Estas réplicas possuem as mesmas habilidades de Shizuke, mas são limitadas pela quantidade de água disponível no ambiente.'
            },
            
            // Hiroshi abilities
            'armadura-dragao': {
                title: 'Armadura de Dragão',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Armadura de terra que se molda como escamas de dragão, oferecendo defesa suprema. Esta proteção não apenas absorve ataques físicos, mas também pode refletir energia espiritual de volta ao atacante.'
            },
            'muralha-terra': {
                title: 'Muralha de Terra',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Criação de muralhas massivas de terra e rocha para defesa e controle de campo. Hiroshi pode erguer estas estruturas instantaneamente, alterando completamente o terreno de batalha.'
            },
            'pisada-sismica': {
                title: 'Pisada Sísmica',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Golpe no solo que gera ondas sísmicas devastadoras em área ampla. Esta técnica pode causar terremotos localizados, desequilibrando inimigos e destruindo estruturas.'
            },
            
            // Moshu abilities
            'visao-cibernetica': {
                title: 'Visão Cibernética',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Olhos mecânicos que podem analisar energia espiritual, pontos fracos e padrões de movimento. Esta tecnologia avançada permite a Moshu processar informações em velocidade sobre-humana.'
            },
            'circuito-mental': {
                title: 'Circuito Mental',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Processamento mental acelerado através de implantes cibernéticos que aumentam drasticamente a velocidade de raciocínio e reflexos. Moshu pode calcular milhares de possibilidades em segundos.'
            },
            'raio-analise': {
                title: 'Raio de Análise',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Feixe de energia que escaneia e analisa completamente o oponente, revelando todas as suas capacidades e fraquezas. Esta análise é instantânea e extremamente precisa.'
            },
            
            // Macuso abilities
            'olho-destruicao': {
                title: 'Olho da Destruição',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Lança raio destrutivo de energia sombria pelo olhar. Este ataque pode perfurar as defesas mais resistentes e causa danos devastadores em linha reta, sendo uma das técnicas mais temidas da Sociedade Demons.'
            },
            'distorcao-sombria': {
                title: 'Distorção Sombria',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Cria campos de distorção visual e sensorial com energia demoníaca. Esta habilidade confunde os sentidos dos oponentes, fazendo-os ver ilusões e perder a noção de realidade durante o combate.'
            },
            'garras-inferno': {
                title: 'Garras do Inferno',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Garras alongadas envoltas em chamas negras que causam cortes profundos e infecciosos. Estas garras não apenas cortam a carne, mas também infectam a alma com energia demoníaca.'
            },
            'passagem-sombria': {
                title: 'Passagem Sombria',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Teleporte através de fendas escuras que ele mesmo abre no espaço. Macuso pode viajar instantaneamente através das dimensões sombrias, aparecendo em qualquer local coberto por trevas.'
            },
            'rugido-demoniaco': {
                title: 'Rugido Demoníaco',
                image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
                description: 'Grito com pressão sônica e indução de medo profundo. Este rugido pode fazer inimigos desmaiarem de terror puro, além de causar danos físicos através de ondas sonoras devastadoras.'
            }
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('ability-modal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal(abilityId) {
        const ability = this.abilities[abilityId];
        if (!ability) {
            console.error(`Ability ${abilityId} not found`);
            return;
        }
        
        const modal = document.getElementById('ability-modal');
        const title = document.getElementById('ability-title');
        const image = document.getElementById('ability-image');
        const description = document.getElementById('ability-description-text');
        
        if (modal && title && image && description) {
            title.textContent = ability.title;
            image.src = ability.image;
            image.alt = ability.title;
            description.textContent = ability.description;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        const modal = document.getElementById('ability-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
}

// Initialize abilities modal
const abilitiesModal = new AbilitiesModal();

// Global functions
function openAbilityModal(abilityId) {
    abilitiesModal.openModal(abilityId);
}

function closeAbilityModal() {
    abilitiesModal.closeModal();
}

// Export functions
window.openAbilityModal = openAbilityModal;
window.closeAbilityModal = closeAbilityModal;