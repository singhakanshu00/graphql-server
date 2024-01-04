import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//db.
import db from './_db.js';

//types.
import { typeDefs } from './schema.js';

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		games: () => db.games,
		reviews: () => db.reviews,
		authors: () => db.authors,
		review: (_, { id }) => db.reviews.find((review) => review.id === id),
		game: (_, { id }) => db.games.find((game) => game.id === id),
		author: (_, { id }) => db.authors.find((author) => author.id === id),
	},
	Game: {
	  	reviews: (parent) => db.reviews.filter((review) => review.game_id === parent.id),
	},
	Author: {
		reviews: (parent) => db.reviews.filter((review) => review.game_id === parent.id),
	},
	Review: {
		author: (parent) => db.authors.find((author) => author.id === parent.author_id),
		game: (parent) => db.games.find((game) => game.id === parent.game_id),
	},
	Mutation: {
		deleteGame: (_, { id }) => db.games.filter((game) => game.id !== id),
		addGame: (_, { game }) => {
			const newGame = {
				id: Math.floor(Math.random() * 100000).toString(),
				...game,
			}

			db.games.push(newGame);
			return newGame;
		},
		editGame: (_, { id, game }) => {
			db.games = db.games.map((g) => {
				if(g.id === id) {
					return {...g, ...game};
				}
				return g;
			})

			return db.games.find((g) => g.id === id);
		},

		deleteAuthor: (_, { id }) => db.authors.filter((author) => author.id !== id),
		addAuthor: (_, { author }) => {
			const newAuthor = {
				id: Math.floor(Math.random() * 100000).toString(),
				...author,
			}

			db.authors.push(newAuthor);
			return newAuthor;
		},
		editAuthor: (_, { id, author }) => {
			db.authors = db.authors.map((a) => {
				if(a.id === id) {
					return {...a, ...author};
				}
				return a;
			})

			return db.authors.find((a) => a.id === id);
		},

		deleteReview: (_, { id }) => db.reviews.filter((review) => review.id !== id),
		addReview: (_, { review }) => {
			const newReview = {
				id: Math.floor(Math.random() * 100000).toString(),
				...review,
			}

			db.reviews.push(newReview);
			return newReview;
		},
		editReview: (_, { id, review }) => {
			db.reviews = db.reviews.map((r) => {
				if(r.id === id) {
					return {...r, ...review};
				}
				return r;
			})

			return db.reviews.find((r) => r.id === id);
		},
	}
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
