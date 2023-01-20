const tgl = Date.now();

const notes = [
    {
        title: "Bimbingan skripsi",
        date: tgl,
        body: "Hari sabtu ada bimbingan di ruanng IF jam 10 pagi",
        tag: ["bimbingan", "skripsi"],
        passed: false,
    },
    {
        title: "Meeting project",
        date: tgl,
        body: "meeting di warjau kafe. presentasi projek BKKBN",
        tag: ["meeting", "project", "office"],
        passed: true,
    },
    {
        title: "Presentasi PA pemWeb",
        date: tgl,
        body: "Minggu besok presentasi projek akhir",
        tag: ["presentasi", "kuliah", "pemweb"],
        passed: false,
    },
];

export default notes;
