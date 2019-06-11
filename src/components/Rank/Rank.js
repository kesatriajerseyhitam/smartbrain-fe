import React from "react";

const Rank = ({user}) => {
	const { name, entries } = user;
	const credential = name ? (
		`Hai ${name}, Your current submit is: `
	) : (
		`Hai guest`
	);

	return (
		<div className="flex flex-wrap justify-center hot-pink">
			<p className="f5 w-100 tc">
				{ credential }
			</p>
			<p className="f1 mv0 w-100 tc">
				{ entries }
			</p>
		</div>
	)
}

export default Rank