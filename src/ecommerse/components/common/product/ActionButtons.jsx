

const ActionButtons = () => {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button className="btn btn-outline-danger">Discard</button>
      <div>
        <button className="btn btn-outline-success me-2">Save Draft</button>
        <button className="btn btn-morado">Publish Product</button>
      </div>
    </div>
  );
};

export default ActionButtons;
