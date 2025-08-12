
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

export const DashboardCard = ({ title, value, change, icon, color = '#6c3483' }) => {
  const isPositive = change?.includes('+');

  return (
    <div className="col-md-6 col-xl-3">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="fw-semibold text-muted text-uppercase mb-0">{title}</h6>
            {icon && (
              <span className="fs-5" style={{ color }}>
                {icon}
              </span>
            )}
          </div>
          <h4 className="fw-bold" style={{ color }}>{value}</h4>

          {change && (
            <div className={`small d-flex align-items-center ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? <FaArrowUp className="me-1" /> : <FaArrowDown className="me-1" />}
              {change}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

 



