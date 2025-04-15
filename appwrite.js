import { Client, Databases, ID, Query } from "appwrite";
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(projectId);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  // 1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await database.listDocuments(databaseId, collectionId, [
      Query.equal("search_term", searchTerm),
    ]);

    // 2. If it does, update the count
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      //  Appwrite that uses $id as a standard for document IDs. and not in javascript
      await database.updateDocument(databaseId, collectionId, doc.$id, {
        count: doc.count + 1,
      });
      // 3. If it doesn't, create a new document with the search term and count as 1
    } else {
      await database.createDocument(databaseId, collectionId, ID.unique(), {
        search_term: searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(databaseId, collectionId, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};
