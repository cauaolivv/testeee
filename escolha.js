// Função para simular busca de dados (na prática, você faria requisições AJAX para um backend)
function fetchDashboardData() {
    // Simulando um delay de rede
    setTimeout(() => {
        // Dados simulados - na prática, viriam de uma API
        const dashboardData = {
            activeClients: 1248,
            newClients: 143,
            revenue: 84720,
            employees: 28,
            employeeDetails: "5 personais, 10 recepcionistas, 2 gerentes",
            revenueGoal: 90000,
            activeClientsChange: 12,
            newClientsChange: 8
        };

        // Atualiza os cards com os dados
        updateCard('clientes-ativos', 
                 dashboardData.activeClients, 
                 `+${dashboardData.activeClientsChange}% em relação ao mês passado`);
        
        updateCard('novos-clientes', 
                 dashboardData.newClients, 
                 `+${dashboardData.newClientsChange}% em relação ao mês passado`);
        
        updateCard('faturamento', 
                 `R$ ${dashboardData.revenue.toLocaleString('pt-BR')}`, 
                 `Meta: R$ ${dashboardData.revenueGoal.toLocaleString('pt-BR')}`);
        
        updateCard('funcionarios', 
                 dashboardData.employees, 
                 dashboardData.employeeDetails);
        
        // Adiciona animação aos cards
        animateCards();
        
    }, 1000); // Simula 1 segundo de delay
}

// Função para atualizar um card específico
function updateCard(cardId, value, description) {
    const card = document.getElementById(cardId);
    if (card) {
        const valueElement = card.querySelector('.stat-value');
        const descElement = card.querySelector('.stat-desc');
        
        if (valueElement) valueElement.textContent = value;
        if (descElement) descElement.textContent = description;
    }
}

// Função para animar os cards
function animateCards() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
        // Delay escalonado para cada card
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
    });
}

// Adiciona estilos de animação dinamicamente
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .stat-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// Quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    fetchDashboardData();
    
    // Atualiza os dados a cada 30 segundos (simulação)
    setInterval(fetchDashboardData, 30000);
    
    // Adiciona efeito hover aos botões
    const buttons = document.querySelectorAll('.botao');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});
