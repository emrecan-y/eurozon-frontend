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
    <div className="flex flex-col justify-center items-center self-center w-1/2 p-6 gap-2 rounded-2xl shadow-xl mt-8 bg-primary-bg-2 ">
      <h1 className="font-bold text-xl">User Informationen</h1>
      <div className="grid grid-cols-2 gap-4 mt-7">
          <p className="font-semibold">E-Mail:</p> <p>{data.email}</p>
          <p className="font-semibold">Name:</p>
          <p>
            {data.surname} {data.name}
          </p>
          <p className="font-semibold">Geburtstag:</p> <p>{new Date(data.dateOfBirth).toLocaleDateString()}</p>
          <p className="font-semibold mt-6">Adresse</p>
          <p></p>
          <p className="font-semibold">City:</p>{" "}
          <p>{data.address.town}</p>
          <p className="font-semibold">Zip Code:</p>{" "}
          <p>{data.address.postalCode}</p>
          <p className="font-semibold">Street:</p>{" "}
          <p>{data.address.street}</p>
          <p className="font-semibold">Street-Nr:</p>{" "}
          <p>{data.address.streetNumber}</p>
        </div>
        <button className="bg-blue-600 p-2 rounded-md mt-4">Adresse ändern</button>
    </div>
  );
};
