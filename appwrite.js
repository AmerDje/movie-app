import { Client, Databases, ID, Query } from "appwrite";
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  //check if the title already exists in the database
  try {
    const result = await database.listDocuments(databaseId, collectionId, [
      Query.equal("search_term", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const document = result.documents[0];
      await database.updateDocument(databaseId, collectionId, document.id, {
        count: document.count + 1,
      });
    } else {
      await database.createDocument(databaseId, collectionId, ID.unique(), {
        search_term: searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
