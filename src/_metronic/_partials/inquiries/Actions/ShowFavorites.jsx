
import React from "react";
import { FormattedMessage } from "react-intl";
import { DefaultTable } from '../../../../app/modules/CyCMovil/Tables/DefaultTable'
import {
    Dialog,
    DialogTitle,
    Button,
    DialogActions,
    DialogContent
} from "@material-ui/core";
 
export default function ShowFavorites({ openFavorites, handleCloseFavorites, favoriteQuerys }) {
    return (
        <Dialog
            open={openFavorites}
            maxWidth="md"
            onClose={handleCloseFavorites}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {<FormattedMessage id="APP.INQUIRIES.MESSAGES.FAVORITES" />}
            </DialogTitle>
            <DialogContent>
                {favoriteQuerys !== undefined && <DefaultTable key={favoriteQuerys.name} data={favoriteQuerys} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseFavorites} color="default" autoFocus>
                    <FormattedMessage id="GLOBAL.WORD.CLOSE" />
                </Button>
            </DialogActions>
        </Dialog>
    )
}