import training from '/assets/img/model_training.png';
import sick from '/assets/img/sick.png';
import casual from '/assets/img/energy_savings_leaf.png';
import dollar from '/assets/img/dollar.png';
import bag from '/assets/img/carry_on_bag.png';
import maternity from '/assets/img/pregnancy.png';
import paternity from '/assets/img/account_child_invert.png';
import { Colors } from '../reusableComponent/styles';




export function Expensestotalsummary({showsummarycards}:any) {
    return (
        <>
            <div className="d-flex  align-items-center" onClick={showsummarycards}style={{ cursor: "pointer" }}><div className="round mr-2"></div><p className="para mb-0 unselectcolor">Total amount (Summary view):</p></div>
        </>
    );
}