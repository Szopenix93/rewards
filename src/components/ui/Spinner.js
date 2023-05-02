import { ClipLoader } from "react-spinners";

const LOADER_SIZE = 100;
const LOADER_COLOR = "rgba(255, 255, 255, 0.85)"

export function Spinner() {
  return (
    <div style={{ width: `${LOADER_SIZE}px`, margin: 'auto' }}>
      <ClipLoader color={LOADER_COLOR} size={LOADER_SIZE}/>
    </div>
  );
}