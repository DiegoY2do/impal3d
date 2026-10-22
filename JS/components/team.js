const teamMembers = [
    {
        name: 'Alejandro Cedeño',
        role: 'Puesto',
        avatarClass: 'team-avatar-purple'
    },
    {
        name: 'Nadia Cedeño',
        role: 'Puesto',
        avatarClass: 'team-avatar-dark'
    }
];

export function renderTeam() {
    const members = teamMembers
        .map(member => `
            <article class="team-card">
                <div class="team-card-header">
                    <div class="team-avatar ${member.avatarClass}" aria-hidden="true"></div>
                </div>

                <div class="team-card-body">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            </article>
        `)
        .join('');

    return `
        <section class="team-section">
            <div class="container-max">
                <header class="team-heading">
                    <h2>El equipo</h2>
                    <p>Las personas detrás de cada pieza.</p>
                </header>

                <div class="team-grid">
                    ${members}
                </div>
            </div>
        </section>
    `;
}