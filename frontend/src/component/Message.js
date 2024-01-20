import Alert from "react-bootstrap/Alert";

function BasicExample({ variant, children }) {
  return (
    <Alert key={variant} variant={variant}>
      {children}
    </Alert>
  );
}

export default BasicExample;
