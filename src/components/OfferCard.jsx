import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";
import PropTypes from "prop-types";

import "moment/dist/locale/fr";
import moment from "moment";
moment.locale("fr");

/* Axe d'amélioration, utiliser TypeScript pour définir le type de l'objet offer */
export default function OfferCard({ offer }) {
  return (
    <Card className="w-[300px] m-4">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col text-left">
          <p>
            <strong>{offer.jobtitle}</strong>
          </p>
          <p className="text-small text-default-500">
            <span>Entreprise : </span>
            {offer.company}
          </p>
          <p className="text-small text-default-500">
            <span>Ville : </span>
            {offer.city}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="justify-between flex-col">
        <p className="mb-2">{offer.title}</p>
        <p>
          <strong>{offer.contractType.join("|")}</strong>
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="justify-between">
        <Link isExternal showAnchorIcon href={offer.link}>
          Postuler
        </Link>
        <small className="text-default-500">
          {moment(offer.publicationDate).fromNow()}
        </small>
      </CardFooter>
    </Card>
  );
}

OfferCard.propTypes = {
  offer: PropTypes.object.isRequired,
};
