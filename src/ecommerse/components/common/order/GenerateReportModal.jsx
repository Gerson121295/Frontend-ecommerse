import { useForm } from "../../../../hooks/useForm";
import { usePedido } from "../../../../hooks/usePedido";
import { BaseModal } from "../BaseModal";
import './GenerateReportModal.css';

const reporteFormFields = {
  fechaInicio: "",
  fechaFin: "",
  soloPagados: false,
};

const reporteFormValidations = {
  fechaInicio: [
    (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
    "Formato inválido (yyyy-MM-dd)",
  ],
  fechaFin: [
    (v, form) =>
      !v ||
      !form.fechaInicio ||
      new Date(v) >= new Date(form.fechaInicio),
    "La fecha fin no puede ser menor a la fecha inicio",
  ],
};


export const GenerateReporteModal = ({ isOpen, onClose }) => {
  const { startExportPedidosReporte } = usePedido();

  const {
    //formState,
    fechaInicio,
    fechaFin,
    fechaFinValid,
    soloPagados,
    onInputChange,
    onResetForm,
    isFormValid,
  } = useForm(reporteFormFields, reporteFormValidations);

  const onGenerate = async (e) => {
    e.preventDefault();

    const today = new Date();
    const year = today.getFullYear();

    const fechaInicioFinal =
      fechaInicio || `${year}-01-01`;
    const fechaFinFinal =
      fechaFin || today.toISOString().slice(0, 10);

    await startExportPedidosReporte({
      fechaInicio: fechaInicioFinal,
      fechaFin: fechaFinFinal,
      soloPagados,
    });

    onClose();
    onResetForm();
  };

  return (
   <BaseModal
  isOpen={isOpen}
  onClose={onClose}
  title="Generar Reporte"
>
  {() => (
    <form className="reporte-form" onSubmit={onGenerate}>
      
      {/* Fecha Inicio */}
      <div className="mb-3">
        <label>Fecha Inicio</label>
        <input
          type="date"
          name="fechaInicio"
          value={fechaInicio}
          onChange={onInputChange}
          className="form-control contorno-campo-estatico"
        />
      </div>

      {/* Fecha Fin */}
      <div className="mb-3">
        <label>Fecha Fin</label>
        <input
          type="date"
          name="fechaFin"
          value={fechaFin}
          min={fechaInicio || undefined}
          onChange={onInputChange}
          className="form-control contorno-campo-estatico"
        />
        {fechaFinValid && (
            <small className="text-danger">{fechaFinValid}</small>
        )}
      </div>

      {/* Toggle */}
      <div className="mb-4">
        <label>Tipo de pedidos</label>
        <div className="toggle-pedidos">
          <button
            type="button"
            className={!soloPagados ? "active" : ""}
            onClick={() =>
              onInputChange({
                target: {
                  name: "soloPagados",
                  type: "checkbox",
                  checked: false,
                },
              })
            }
          >
            TODOS
          </button>

          <button
            type="button"
            className={soloPagados ? "active" : ""}
            onClick={() =>
              onInputChange({
                target: {
                  name: "soloPagados",
                  type: "checkbox",
                  checked: true,
                },
              })
            }
          >
            PAGADOS/APROBADO
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="reporte-footer">
        <button
          type="submit"
          className="btn btn-morado px-4"
          disabled={!isFormValid}
        >
          Generar reporte
        </button>

        <button
          type="button"
          className="btn btn-blanco-morado px-4"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>

    </form>
  )}
</BaseModal>
  );
};