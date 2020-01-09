import React, { useEffect, useState } from 'react';
import './App.css';

import db from './db'

const App = () => {

	const [activiaAmount, setActiviaAmount] = useState(0)
	const [cerealAmount, setCerealAmount] = useState(0)
	const [mugsAmount, setMugsAmount] = useState(0)
	const [pringlesPurpleAmount, setPringlesPurpleAmount] = useState(0)
	const [pringlesRedAmount, setPringlesRedAmount] = useState(0)

	const [errorContent, setError] = useState("")

	const maxItems = 36

	useEffect(() => {
		readDb()
	},[])

	useEffect(() => {
		checkTotalAmount()
	},[activiaAmount, cerealAmount, mugsAmount, pringlesRedAmount, setPringlesPurpleAmount])

	const writeDb = () => {
		db.ref('store/amounts').set({
			activia: activiaAmount,
			cereal: cerealAmount,
			mugs: mugsAmount,
			pringlesPurple: pringlesPurpleAmount,
			pringlesRed: pringlesRedAmount
		});
		alert("Store updated succesfully.")
	}

	const readDb = () => {
		db.ref('store/amounts').once('value')
		.then(function(snapshot) {
			let amounts = snapshot.val()
			setActiviaAmount(amounts.activia)
			setCerealAmount(amounts.cereal)
			setMugsAmount(amounts.mugs)
			setPringlesPurpleAmount(amounts.pringlesPurple)
			setPringlesRedAmount(amounts.pringlesRed)
		  });
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if(errorContent === "")
			writeDb()
		else
			alert("Something is wrong.")
	}

	const checkTotalAmount = () => {
		let totalItmes = (activiaAmount + cerealAmount + mugsAmount + pringlesRedAmount + pringlesPurpleAmount)
		if(totalItmes > 36) {
			setError(<p className="error">Too much items. 36 total max.</p>)
		} else 
			setError("")
	}

	const handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name

		switch(name) {
			case "activiaAmount":
				setActiviaAmount(parseInt(value))
				break

			case "cerealAmount":
				setCerealAmount(parseInt(value))
				break

			case "mugsAmount":
				setMugsAmount(parseInt(value))
				break

			case "pringlesPurpleAmount":
				setPringlesPurpleAmount(parseInt(value))
			break

			case "pringlesRedAmount":
				setPringlesRedAmount(parseInt(value))
			break

			default:
				break
		}

		
	}

    return (
        <div className="App">
			<header>
				<h1>Store CMS</h1>
			</header>
			
			<form onSubmit={handleSubmit} method="post">
				<h2>Aantal items op display</h2>
				{errorContent}
					<label>
						Aantal Activia
						<input
							name="activiaAmount"
							type="number"
							value={activiaAmount}
							onChange={handleInputChange}/>
					</label>
					<label>
						Aantal Cornflakes
						<input
							name="cerealAmount"
							type="number"
							value={cerealAmount}
							onChange={handleInputChange}/>
					</label>
					<label>
						Aantal Tassen
						<input
							name="mugsAmount"
							type="number"
							value={mugsAmount}
							onChange={handleInputChange}/>
					</label>
					<label>
						Aantal Paarse Pringles
						<input
							name="pringlesPurpleAmount"
							type="number"
							value={pringlesPurpleAmount}
							onChange={handleInputChange}/>
					</label>
					<label>
						Aantal Rode Pringles
						<input
							name="pringlesRedAmount"
							type="number"
							value={pringlesRedAmount}
							onChange={handleInputChange}/>
					</label>
					<input className='button' type="submit" value="Opslaan" />
				</form>
        </div>
    )
}

export default App;
