function FaqItem(props) {
    return (
        <div className={props.dangMo ? "faq-item active" : "faq-item"}>
            <button className="faq-question" onClick={props.onBamCauHoi}>
                {props.cauHoi}
                <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer">
                <p>{props.cauTraLoi}</p>
            </div>
        </div>
    );
}

export default FaqItem;