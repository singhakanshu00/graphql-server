export const typeDefs = `#graphql
	type Game {
		id: ID!
		title: String!
		platform: [String!]!
		reviews: [Review!]
	}

	type Review {
		id: ID!
		rating: Int!
		content: String!
		game: Game!
		author: Author!
	}

	type Author {
		id: ID!
		name: String!
		verified: Boolean!
		reviews: [Review!]
	}

	type Query {
		reviews: [Review]
		review(id: ID!): Review
		games: [Game]
		game(id: ID!): Game
		authors: [Author]
		author(id: ID!): Author
	}

	type Mutation {
		deleteGame(id: ID!): [Game]
		addGame(game: AddGameInput!): Game
		editGame(id: ID!, game: EditGameInput!): Game

		deleteAuthor(id: ID!): [Author]
		addAuthor(author: AddAuthorInput!): Game
		editAuthor(id: ID!, author: EditAuthorInput!): Author

		deleteReview(id: ID!): [Review]
		addReview(review: AddReviewInput!): Review
		editReview(id: ID!, review: EditReviewInput!): Review
	}

	input AddGameInput {
		title: String!
		platform: [String!]!
	}

	input EditGameInput {
		title: String!
		platform: [String!]!
	}

	input AddAuthorInput {
		name: String!
		verified: Boolean!
	}

	input EditAuthorInput {
		name: String!
		verified: Boolean!
	}

	input AddReviewInput {
		rating: Int!
		content: String!
		game: [ID!]
		author: [ID!]
	}

	input EditReviewInput {
		rating: Int!
		content: String!
		game: [ID!]
		author: [ID!]
	}
`;