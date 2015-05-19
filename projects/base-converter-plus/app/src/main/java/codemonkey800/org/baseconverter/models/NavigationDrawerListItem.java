package codemonkey800.org.baseconverter.models;

public class NavigationDrawerListItem {

    private int icon;
    private String title;

    public NavigationDrawerListItem() {
    }

    public NavigationDrawerListItem( int icon, String title ) {
        this.icon = icon;
        this.title = title;
    }

    public int getIcon() {
        return icon;
    }

    public void setIcon( int icon ) {
        this.icon = icon;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle( String title ) {
        this.title = title;
    }
}
