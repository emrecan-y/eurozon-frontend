import { useUserQuery } from "./queries/useUserQuery";

export const UserDataPage = () => {
  const { data, isLoading, isError } = useUserQuery();

  if (isLoading) {
    return <div className="loading">Lade Daten...</div>;
  }

  if (isError) {
    return <div className="error">Fehler beim Laden der Daten</div>;
  }

  if (!data) {
    return <div className="no-data">Keine Daten verfügbar</div>;
  }

  return (
    <div className="user-container">
      <h2>User Informationen</h2>
      <div className="user-details">
        <p>
          <strong>Name:</strong> {data.name} {data.surname}
        </p>
        <p>
          <strong>E-Mail:</strong> {data.email}
        </p>
        <p>
          <strong>Rolle:</strong> {data.role}
        </p>
        <p>
          <strong>Geburtsdatum:</strong>{" "}
          {new Date(data.dateOfBirth).toLocaleDateString()}
        </p>
        <p>
          <strong>Erstellt am:</strong>{" "}
          {new Date(data.dateOfCreation).toLocaleDateString()}
        </p>
       
          <div className="address-section">
            <strong>Adresse:</strong>
            <p>
              {data.address.street} {data.address.streetNumber}
            </p>
            <p>
              {data.address.postalCode} {data.address.town}
            </p>
            <p>{data.address.country}</p>
          </div>
      </div>
    </div>
  );
};

// CSS bleibt gleich
const styles = `
  .user-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  h2 {
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  p {
    margin: 5px 0;
    color: #666;
  }

  strong {
    color: #333;
    margin-right: 5px;
  }

  .address-section {
    margin-top: 10px;
    padding-left: 20px;
  }

  .loading, .error, .no-data {
    text-align: center;
    padding: 20px;
    color: #666;
  }

  .error {
    color: #d32f2f;
  }
`;