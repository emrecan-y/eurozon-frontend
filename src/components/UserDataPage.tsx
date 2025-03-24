import { useAuthUser } from "../hooks/useAuthUser";

export const UserDataPage = () => {
  const { user, userIsLoading } = useAuthUser();

  if (userIsLoading) {
    return <div className="loading">Lade Daten...</div>;
  }

  if (!user) {
    return <div className="no-data">Keine Daten verfügbar</div>;
  }

  return (
    <div className="mx-2 mt-8 flex flex-col items-center justify-center gap-2 self-center rounded-2xl bg-primary-bg-2 p-6 text-sm shadow-xl sm:text-base">
      <h1 className="text-xl font-bold">Persönliche daten</h1>
      <div className="mt-7 grid grid-cols-2 gap-1">
        <p className="font-semibold">E-Mail:</p> <p>{user.email}</p>
        <p className="font-semibold">Name:</p>
        <p>
          {user.surname} {user.name}
        </p>
        <p className="font-semibold">Geburtstag:</p>{" "}
        <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
        <p className="mt-6 font-semibold">Adresse</p>
        <p></p>
        <p className="font-semibold">Stadt:</p> <p>{user.address.town}</p>
        <p className="font-semibold">Postleitzahl:</p>
        <p>{user.address.postalCode}</p>
        <p className="font-semibold">Straße:</p> <p>{user.address.street}</p>
        <p className="font-semibold">Straßennr.:</p>{" "}
        <p>{user.address.streetNumber}</p>
      </div>
      <button className="mt-4 rounded-md bg-blue-600 p-2">
        Adresse bearbeiten
      </button>
    </div>
  );
};
