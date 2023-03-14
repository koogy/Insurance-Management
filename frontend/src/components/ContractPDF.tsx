import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import {Contract} from "./Account/Contract";

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
});
export default function ContractPDF (contract: Contract )  {


    return (
        <Document>
            <Page style={{ margin: 20 }}>
                <View style={{
                    display: "flex", backgroundColor: '#f04c64',
                    flexDirection: "row", marginBottom: 20, height: 100
                }}>
                    <Image src="/wic.png" style={{
                        height: 100,
                        width: 150
                    }}></Image>
                </View>


                <View style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                    <Text style={styles.text}>N° de contrat: {contract.id}</Text>
                    <Text style={styles.text}>Le : {(new Date()).toLocaleDateString("fr-FR")}</Text>
                </View>
                <View style={{alignSelf: 'center', textAlign: "center", flexDirection: "row", marginBottom: 20}}>
                    <Text style={styles.text}>ATTESTATION D'ASSURANCE</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", margin: 10, border:'1px solid black', padding: 10, width: '90%'}}>
                    <Text style={styles.text}>Souscrit par</Text>
                    <Text style={styles.text}>WIC Group</Text>
                    <Text style={styles.text}>55 Rue du Faubourg Saint-Honoré</Text>
                    <Text style={styles.text}>75008</Text>
                    <Text style={styles.text}>Paris</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", margin: 10, border: '1px solid black', padding: 10, width: '90%'}}>
                    <Text style={styles.text}>Courtier</Text>
                    <Text style={styles.text}>Antoine Liu</Text>
                    <Text style={styles.text}>19 Avenue de Choisy</Text>
                    <Text style={styles.text}>Paris</Text>
                    <Text style={styles.text}>75013</Text>
                </View>

                <View style={{ display: "flex", flexDirection: "column", margin:10, border: '1px solid black', padding: 10, width: '90%'}}>
                    <Text style={styles.text}>Titulaire du contrat</Text>
                    <Text style={styles.text}>Nom: {contract.name}</Text>
                    <Text style={styles.text}>Email: {contract.email}</Text>
                    <Text style={styles.text}>Adresse: {contract.address}</Text>
                    <Text style={styles.text}>Code Postal: {contract.postalCode}</Text>
                    <Text style={styles.text}>Ville: {contract.city}</Text>
                    <Text style={styles.text}>Premium : {contract.premium}</Text>
                </View>
            </Page>
        </Document>
    );
}
