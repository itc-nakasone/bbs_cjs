const deleteConfirm = () => {
    return window.confirm("削除してもよろしいですか?\n削除すると元には戻せません。");
};

const threadDelete = evt => {
    if (deleteConfirm()) {
        const tid = evt.currentTarget.dataset.tid;
        location.href = `/threads/delete/${tid}`;
    }
};

const messageDelete = evt => {
    if (deleteConfirm()) {
        const tid = evt.currentTarget.dataset.tid;
        const mid = evt.currentTarget.dataset.mid;
        location.href = `/messages/delete/${tid}/${mid}`;
    }
}

export {threadDelete, messageDelete};