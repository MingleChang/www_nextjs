import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import Navigation from '../components/navigation'

import { GuessCategoriesAPI, GuessLanguagesAPI, GuessListAPI } from '../api/guess'

export default function Guess(props) {

    const [category, setCategory] = React.useState("")
    const [language, setLanguage] = React.useState("")
    const [categories, setCategories] = React.useState([])
    const [languages, setLanguages] = React.useState([])
    const [guesses, setGuesses] = React.useState([])
    const [result, setResult] = React.useState({})
    React.useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        let admin = false
        if (user) {
            admin = user.admin
        }
        if (admin != true) {
            window.location = "/"
            return
        }
        requestCategories()
        reuqestLanguages()
        requestList(category, language, 0, 10)
    }, [])

    function handleChangePage(event, newPage) {
        requestList(category, language, newPage, result.size)
    };

    const handleChangeRowsPerPage = event => {
        let size = parseInt(event.target.value, 10);
        requestList(category, language, result.number, size)
    };
    async function requestCategories() {
        try {
            let lCategories = await GuessCategoriesAPI()
            setCategories(lCategories)
        }catch (error) {

        }
    }
    async function reuqestLanguages() {
        try {
            let lLanguages= await GuessLanguagesAPI()
            setLanguages(lLanguages)
        }catch (error) {

        }
    }
    async function requestList(category, language, page, size) {
        try {
            let lResult= await GuessListAPI(category, language, page, size)
            setResult(lResult)
            setGuesses(lResult.content)
            console.log(lResult.numberOfElements)
        }catch (error) {

        }
    }
    return (
        <div>
            <Head>
                <title>Guess</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        
            <Navigation title='Guess'></Navigation>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Word</TableCell>
                            <TableCell align='center'>Category</TableCell>
                            <TableCell align='center'>Language</TableCell>
                            <TableCell align='center'>Version</TableCell>
                            <TableCell align='center'>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {guesses.map((guess, index) => (
                        <TableRow key={index}>
                            <TableCell align='center'>{guess.word}</TableCell>
                            <TableCell align='center'>{guess.category}</TableCell>
                            <TableCell align='center'>{guess.language}</TableCell>
                            <TableCell align='center'>{guess.version}</TableCell>
                            <TableCell align='center'>
                                <IconButton aria-label="delete">
                                    <DeleteIcon></DeleteIcon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25]}
                component="div"
                count={result.totalElements?result.totalElements:0}
                rowsPerPage={result.size?result.size:10}
                page={result.number?result.number:0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                >
                </TablePagination>
            </Container>
        </div>
    )
}
