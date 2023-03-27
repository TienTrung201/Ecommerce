import DOMPurify from 'dompurify';

function TextEditorDiv({ value }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(value),
      }}
    ></div>
  );
}

export default TextEditorDiv;
