import { useState, CSSProperties } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"



export default function Loader() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="sweet-loading">

            <ClimbingBoxLoader
                color={'black'}
                loading={loading}
                style={{display:"block"}}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}