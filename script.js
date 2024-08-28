document.addEventListener("DOMContentLoaded", () => {
    const app = (function () {
        const notesContainer = document.getElementById("notes-container");
        const addNewNoteBtn = document.getElementById("add-new-note");
        const searchInput = document.getElementById("search-notes");
        const deleteModal = document.getElementById("delete-modal");
        const confirmDeleteBtn = document.getElementById("confirm-delete");
        const cancelDeleteBtn = document.getElementById("cancel-delete");
        const noteFormContainer = document.getElementById("note-form-container");
        const noteTitleInput = document.getElementById("note-title");
        const noteContentInput = document.getElementById("note-content");
        const saveNoteBtn = document.getElementById("save-note");
        const cancelNoteBtn = document.getElementById("cancel-note");

        let notes = [
            {
                title: "Note title",
                content: "Note body",
                date: "May 22",
            },
            {
                title: "Note title",
                content: "Very long Note Body to give you an example on how the box should act",
                date: "May 22",
            },
        ];

        let noteToDeleteIndex = null;

        const renderNotes = () => {
            notesContainer.innerHTML = "";
            notes.forEach((note, index) => {
                const noteCard = createNoteCard(note, index);
                notesContainer.appendChild(noteCard);
            });

            addEventListeners();
        };

        const createNoteCard = (note, index) => {
            const noteCard = document.createElement("div");
            noteCard.className = "note-card";
            noteCard.innerHTML = `
                <div class="note-card__header">
                    <h2 class="note-card__title">${note.title}</h2>
                    <div class="note-card__actions">
                        <a class="note-card__edit-btn icon inactive" data-index="${index}" title="Editing is disabled">
                            <img src="./assets/icons/edit.png"/>
                        </a>
                        <a class="note-card__delete-btn icon" data-index="${index}">
                            <img src="./assets/icons/trash.png"/>
                        </a>
                    </div>
                </div>
                <p class="note-card__content">${note.content}</p>
                <p class="note-card__date">${note.date}</p>
            `;
            return noteCard;
        };

        const addEventListeners = () => {
            document.querySelectorAll(".note-card__delete-btn").forEach(element => {
                element.addEventListener("click", handleDeleteNoteClick);
            });
        };

        const handleDeleteNoteClick = (e) => {
            noteToDeleteIndex = parseInt(e.target.closest("a").dataset.index);
            deleteModal.classList.remove("hidden");
        };

        const handleDeleteNote = () => {
            if (noteToDeleteIndex !== null) {
                notes.splice(noteToDeleteIndex, 1);
                noteToDeleteIndex = null;
                deleteModal.classList.add("hidden");
                renderNotes();
            }
        };

        const handleCancelDelete = () => {
            noteToDeleteIndex = null;
            deleteModal.classList.add("hidden");
        };

        const handleAddNewNote = () => {
            noteFormContainer.classList.remove("hidden");
            addNewNoteBtn.classList.add("hidden");
        };

        const handleSaveNewNote = () => {
            const title = noteTitleInput.value.trim();
            const content = noteContentInput.value.trim();

            if (title && content) {
                const newNote = {
                    title: title,
                    content: content,
                    date: new Date().toLocaleDateString(),
                };

                notes.unshift(newNote);
                noteTitleInput.value = "";
                noteContentInput.value = "";
                noteFormContainer.classList.add("hidden");
                addNewNoteBtn.classList.remove("hidden");
                renderNotes();
            }
        };

        const handleCancelNewNote = () => {
            noteTitleInput.value = "";
            noteContentInput.value = "";
            noteFormContainer.classList.add("hidden");
            addNewNoteBtn.classList.remove("hidden");
        };

        const handleSearchNotes = (e) => {
            const searchTerm = e.target.value.toLowerCase();
            notesContainer.innerHTML = "";
            notes
                .filter(note => note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm))
                .forEach((note, index) => {
                    const noteCard = createNoteCard(note, index);
                    notesContainer.appendChild(noteCard);
                });

            addEventListeners();
        };

        const init = () => {
            addNewNoteBtn.addEventListener("click", handleAddNewNote);
            saveNoteBtn.addEventListener("click", handleSaveNewNote);
            cancelNoteBtn.addEventListener("click", handleCancelNewNote);
            searchInput.addEventListener("input", handleSearchNotes);
            confirmDeleteBtn.addEventListener("click", handleDeleteNote);
            cancelDeleteBtn.addEventListener("click", handleCancelDelete);
            renderNotes();
        };

        return {
            init
        };
    })();

    app.init();
});
