import { Link } from "react-router-dom";

interface PreconCardProps {
  id: string;
  name: string;
  colors: string;
  image: string;
  year: string;
  theme: string;
}

const PreconCard = ({ id, name, colors, image, year, theme }: PreconCardProps) => {
  return (
    <Link to={`/precon/${id}`} className="group relative block">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-500"></div>
      
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border card-glow">
        {/* Card Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Card Info */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-accent">{year}</span>
            <span className="text-xs font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">
              {colors}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {theme}
          </p>

          <div className="pt-2 flex gap-2">
            <span className="flex-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium text-center">
              View Upgrades
            </span>
            <span className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-colors text-sm font-medium">
              Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PreconCard;
