import React from "react";

function addSheet() {
  return (
    <div>
      <form id="addSheetForm">
        <div>
          <label for="title">Titre :</label>
          <input type="text" id="title" name="title" required maxLength="50" />
        </div>
        <div>
          <label for="description">Description :</label>
          <textarea id="description" name="description" required></textarea>
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default addSheet;
