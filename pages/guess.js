import React from 'react'
import Head from 'next/head'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import DeleteIcon from '@material-ui/icons/Delete'

import Navigation from '../components/navigation'

import { GuessCategoriesAPI, GuessLanguagesAPI, GuessListAPI, GuessDeleteAPI, GuessCreateAPI } from '../api/guess'

import styles from '../css/guess.css'

let sWord = ""
let sCategory = ""
let sLanguage = ""

export default function Guess(props) {

    const [wordValue, setWordValue] = React.useState("")
    const [categoryValue, setCategoryValue] = React.useState("")
    const [languageValue, setLanguageValue] = React.useState("")

    const [categories, setCategories] = React.useState([])
    const [languages, setLanguages] = React.useState([])
    const [guesses, setGuesses] = React.useState([])
    const [result, setResult] = React.useState({})

    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [dialogWord, setDialogWord] = React.useState("")
    const [dialogCategory, setDialogCategory] = React.useState("")
    const [dialogLanguage, setDialogLanguage] = React.useState("")

    const [loading, setLoading] = React.useState(false)

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
        requestList(sWord, sCategory, sLanguage)
    }, [])

    function handleChangePage(event, newPage) {
        requestList(sWord, sCategory, sLanguage, newPage, result.size)
    };

    function handleWordValue(event) {
        setWordValue(event.target.value)
    }
    function handleCategoryValue(event) {
        setCategoryValue(event.target.value)
    }
    function handleLanguageValue(event) {
        setLanguageValue(event.target.value)
    }
    function handleSearchButton() {
        sWord = wordValue
        sCategory = categoryValue
        sLanguage = languageValue
        requestList(sWord, sCategory, sLanguage)
    }
    function handleAddButton() {
        setDialogOpen(true)
    }
    function handleDeleteButton(model) {
        requestDelete(model.word, model.language)
        requestList(sWord, sCategory, sLanguage)
    }

    function handleChangeRowsPerPage(event) {
        let size = parseInt(event.target.value, 10);
        requestList(sWord, sCategory, sLanguage, result.number, size)
    }

    function handleDialogWord(event) {
        setDialogWord(event.target.value)
    }
    function handleDialogCategory(event) {
        setDialogCategory(event.target.value)
    }
    function handleDialogLanguage(event) {
        setDialogLanguage(event.target.value)
    }
    function handleDialogCancel() {
        setDialogOpen(false)
        setDialogWord("")
        setDialogCategory("")
        setDialogLanguage("")
    }
    function handleDialogConfirm() {
        let word = dialogWord.trim()
        let category = dialogCategory.trim()
        let language = dialogLanguage.trim()
        if (word.length == 0 || category.length == 0 || language.length == 0) {
            return
        }
        requestCreate(word, category, language)
        setDialogOpen(false)
        setDialogWord("")
        setDialogCategory("")
        setDialogLanguage("")
    }
    async function requestCategories() {
        try {
            let lCategories = await GuessCategoriesAPI()
            setCategories(lCategories)
        } catch (error) {

        }
    }
    async function reuqestLanguages() {
        try {
            let lLanguages = await GuessLanguagesAPI()
            setLanguages(lLanguages)
        } catch (error) {

        }
    }
    async function requestList(word, category, language, page, size) {
        try {
            setLoading(true)
            let lResult = await GuessListAPI(word, category, language, page, size)
            setResult(lResult)
            setGuesses(lResult.content)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    async function requestDelete(word, language) {
        try {
            setLoading(true)
            await GuessDeleteAPI(word, language)
            requestList(sWord, sCategory, sLanguage)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    async function requestCreate(word, category, language) {
        try {
            setLoading(true)
            await GuessCreateAPI(word, category, language)
            requestList(sWord, sCategory, sLanguage)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <div>
            <Head>
                <title>Guess</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation title='Guess'></Navigation>

            <Container id={`${styles.guess_content}`}>
                <Grid id={`${styles.guess_table}`} container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <TextField
                            fullWidth={true}
                            label='Word'
                            value={wordValue}
                            onChange={handleWordValue}
                        ></TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            select
                            fullWidth={true}
                            label='Category'
                            value={categoryValue}
                            onChange={handleCategoryValue}
                        >
                            <MenuItem value=""><em>-</em></MenuItem>
                            {categories.map((value, index) => (
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            select
                            fullWidth={true}
                            label='Language'
                            value={languageValue}
                            onChange={handleLanguageValue}
                        >
                            <MenuItem value=""><em>-</em></MenuItem>
                            {languages.map((value, index) => (
                                <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button
                                    id={`${styles.guess_search_button}`}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSearchButton}
                                >Search</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    id={`${styles.guess_create_button}`}
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddButton}
                                >Add</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
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
                                    <IconButton aria-label="delete" onClick={handleDeleteButton.bind(this, guess)}>
                                        <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={result.totalElements ? result.totalElements : 0}
                    rowsPerPage={result.size ? result.size : 10}
                    page={result.number ? result.number : 0}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                >
                </TablePagination>
            </Container>
            <Dialog open={dialogOpen} onClose={handleDialogCancel}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Word"
                        fullWidth
                        value={dialogWord}
                        onChange={handleDialogWord}
                    ></TextField>

                    <TextField
                        select
                        margin="dense"
                        label="Category"
                        fullWidth
                        value={dialogCategory}
                        onChange={handleDialogCategory}
                    >
                        {categories.map((value, index) => (
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        label="Language"
                        fullWidth
                        value={dialogLanguage}
                        onChange={handleDialogLanguage}
                    >
                        {languages.map((value, index) => (
                            <MenuItem key={index} value={value}>{value}</MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogCancel}>Cancel</Button>
                    <Button onClick={handleDialogConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
        </div>
    )
}
