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
    <div className="mx-2 mt-8 flex flex-col items-center justify-center gap-2 self-center rounded-2xl bg-primary-bg-2 p-6 text-sm shadow-xl sm:text-base">
      <h1 className="text-xl font-bold">Persönliche daten</h1>
      <div className="mt-7 grid grid-cols-2 gap-1">
        <p className="font-semibold">E-Mail:</p> <p>{data.email}</p>
        <p className="font-semibold">Name:</p>
        <p>
          {data.surname} {data.name}
        </p>
        <p className="font-semibold">Geburtstag:</p>{" "}
        <p>{new Date(data.dateOfBirth).toLocaleDateString()}</p>
        <p className="mt-6 font-semibold">Adresse</p>
        <p></p>
        <p className="font-semibold">Stadt:</p> <p>{data.address.town}</p>
        <p className="font-semibold">Postleitzahl:</p>
        <p>{data.address.postalCode}</p>
        <p className="font-semibold">Straße:</p> <p>{data.address.street}</p>
        <p className="font-semibold">Straßennr.:</p>{" "}
        <p>{data.address.streetNumber}</p>
      </div>
      <button className="mt-4 rounded-md bg-blue-600 p-2">
        Adresse bearbeiten
      </button>
    </div>
  );
};
