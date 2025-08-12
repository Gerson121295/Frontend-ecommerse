
import "./AddCategoryModal.css"; // Assuming you have a CSS file for styling

const AddCategoryModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="modal-title fw-bold mb-0">Add Category</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body px-0">
            <form>
              <div className="mb-4">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Fashion"
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  placeholder="Enter a description..."
                  rows={3}
                ></textarea>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer px-0 border-0 d-flex justify-content-end gap-2 mt-2">
            <button className="btn btn-primary">Add</button>
            <button className="btn btn-outline-danger" onClick={onClose}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;