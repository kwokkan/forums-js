import { Breadcrumb as RBreadcrumb, Icon } from "rsuite";
import { IBreadcrumb } from "../types/IBreadcrumb";

interface IProps {
    breadcrumbs: IBreadcrumb[];
}

export function Breadcrumb({ breadcrumbs }: IProps) {
    return (
        <RBreadcrumb>
            <RBreadcrumb.Item href="/" passHref title="Home">
                <Icon icon="home" />
            </RBreadcrumb.Item>

            {breadcrumbs.map(x =>
                <RBreadcrumb.Item key={x.url} title={x.title} href={x.url}>
                    {x.title}
                </RBreadcrumb.Item>
            )}
        </RBreadcrumb>
    );
}
