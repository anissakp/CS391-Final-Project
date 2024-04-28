// Margo

// page that renders the ArtistInfo component
import { useParams } from 'react-router-dom';
import ArtistInfo from "../components/ArtistInfo.jsx";

export default function ArtistPage() {
    const { id } = useParams(); // extracts 'id' from the URL

    return (
        <>
            <ArtistInfo id={id}/>
        </>
    );
}