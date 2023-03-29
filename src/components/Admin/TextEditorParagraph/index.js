import DOMPurify from 'dompurify';

function TextEditorParagraph({ value, style, className }) {
    return (
        <p
            style={{ ...style }}
            className={className}
            dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(value),
            }}
        ></p>
    );
}

export default TextEditorParagraph;
